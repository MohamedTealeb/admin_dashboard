'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 const users=()=>{

    const data = [
        {
            id: "INV001",
            status: "Paid",
            method: "Credit Card",
            amount: "$250.00"
        },
        {
            id: "INV002", 
            status: "Pending",
            method: "PayPal",
            amount: "$150.00"
        },
        {
            id: "INV003",
            status: "Unpaid", 
            method: "Bank Transfer",
            amount: "$350.00"
        },
        {
            id: "INV004",
            status: "Paid",
            method: "Credit Card", 
            amount: "$450.00"
        },
        {
            id: "INV005",
            status: "Failed",
            method: "PayPal",
            amount: "$550.00"
        }
    ]
        
    
    return <>
    
    <div className="w-full max-w-6xl mx-auto p-6">
      <Table className="text-lg">
        <TableCaption className="text-xl mb-4">A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className="h-16 ">
            <TableHead className="w-[500px] text-lg font-semibold">Invoice</TableHead>
            <TableHead className="text-lg   font-semibold">Status</TableHead>
            <TableHead className="text-lg font-semibold">Method</TableHead>
            <TableHead className="text-right text-lg font-semibold">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="h-14 hover:bg-gray-50 hover:text-black">
              <TableCell className="font-medium text-base py-4">{item.id}</TableCell>
              <TableCell className="text-base gap-8 py-4">{item.status}</TableCell>
              <TableCell className="text-base gap-8 py-4">{item.method}</TableCell>
              <TableCell className="text-right gap-8 text-base py-4">{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    
    
    </>

}
export default users