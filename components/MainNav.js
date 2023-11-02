"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function MainNav({
  className,
  ...props
}) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/dashboard`,
      label: 'Overview',
      active: pathname === `/dashboard`,
    },
    {
      href: `/dashboard/projects`,
      label: 'Projects',
      active: pathname === `/dashboard/projects`,
    },
    {
      href: `/dashboard/inventory`,
      label: 'Inventory',
      active: pathname === `/dashboard/inventory`,
    },
    {
      href: `/dashboard/staff`,
      label: 'Staff',
      active: pathname === `/dashboard/staff`,
    },
    {
      href: `/dashboard/settings`,
      label: 'Settings',
      active: pathname === `/dashboard/settings`,
    },
   
    
  ];
  return (
    <nav className={cn("flex items-center gap-4 space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-md font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
        
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
