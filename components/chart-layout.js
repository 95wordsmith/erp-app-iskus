'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChartLayout = ({title,children}) => {
  return ( 
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
   );
}
 
export default ChartLayout;