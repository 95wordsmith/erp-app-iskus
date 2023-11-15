import prisma from "@/lib/prisma";

export const getGraphRevenue = async (start, end) => {
  const projectsRange =
    start && end
      ? await prisma.projects.findMany({
          where: {
            status: "COMPLETED",
            date: {
              gte: new Date(start),
              lt: new Date(end),
            },
          },
          select: {
            amountTotal: true,
            date: true,
          },
        })
      : [];

  const monthlyRevenue = {};
  let totalRevenue = 0;

  for (const project of projectsRange) {
    const year = project.date.getFullYear();
    const month = project.date.getMonth();
    const revenue = project.amountTotal;
    const key = `${year}-${month}`;
    monthlyRevenue[key] = (monthlyRevenue[key] || 0) + revenue;
    totalRevenue += revenue;
  }

  const graphData = [];
  let hasNonZeroValue = false; // Track if there's any non-zero value

  for (const key in monthlyRevenue) {
    const [year, month] = key.split('-');
    const total = monthlyRevenue[key];

    if (total > 0 || hasNonZeroValue) {
      graphData.push({
        name: `${getMonthName(parseInt(month))} ${year}`,
        total: total,
      });
      hasNonZeroValue = true;
    }
  }

  return { graphData, totalRevenue };
};

const getMonthName = (monthIndex) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[monthIndex];
};
