
import xlsx from "json-as-xlsx";

export async function downloadToExcel(data ,type) {

  if(type ==='project'){

    let columns = [
      {
        sheet: "Projects",
        columns: [
          { label: "Title", value: "title" },
          { label: "Pin Number", value: "pinNum" },
          { label: "Type", value: "type" },
          { label: "Customer", value: "customer" },
          { label: "Location", value: "location" },
          { label: "Status", value: "status" },    
          {
            label: "Date",
            value: (row) => new Date(row.date).toLocaleDateString(),
          },
        ],
        content:data
      },
    ]
    let settings ={
      fileName: "Project-Data",
      extraLength: 3,
    }
    xlsx(columns,settings)
  } else if (type ==='staff'){

    let columns = [
      {
        sheet: "Staff",
        columns: [
          { label: "Username", value: "username" },
          { label: "Role", value: "role" },
          { label: "Full Name", value: "fullName" },
          { label: "Email", value: "email" },
          {
            label: "Phone Number",
            value: (row) => '0' + row.phoneNumber,
          },
          { label: "Address", value: "address" },
          { label: "Position", value: "position" },    
        ],
        content:data
      },
    ]
    let settings ={
      fileName: "Staff-Data",
      extraLength: 3,
    }
    xlsx(columns,settings)
  }

  
}
