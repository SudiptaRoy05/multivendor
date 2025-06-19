import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
    const orders = [
        { id: "ord-01", date: "May 15, 2025", buyer: "Mike Turner", amount: "$200", status: "Pending" },
        { id: "ord-02", date: "May 14, 2025", buyer: "Mike Turner", amount: "$100", status: "Shipped" },
        { id: "ord-03", date: "May 14, 2025", buyer: "Mike Turner", amount: "$300", status: "Delivered" },
        { id: "ord-04", date: "May 13, 2025", buyer: "Mike Turner", amount: "$100", status: "Cancelled" },
        { id: "ord-05", date: "May 15, 2025", buyer: "Mike Turner", amount: "$500", status: "Delivered" },
        { id: "ord-06", date: "May 15, 2025", buyer: "Mike Turner", amount: "$50", status: "Delivered" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-400";
            case "Shipped":
                return "bg-blue-400";
            case "Delivered":
                return "bg-green-400";
            case "Cancelled":
                return "bg-red-400";
            default:
                return "bg-gray-400";
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Orders</h2>
            </div>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by order ID or customer name"
                    className="w-1/3 p-2 border rounded"
                />
                <div className="flex space-x-2">
                    <Button variant="outline" className="border border-gray-300 bg-white">All</Button>
                    <Button variant="outline" className="border border-gray-300">Pending</Button>
                    <Button variant="outline" className="border border-gray-300">Shipped</Button>
                    <Button variant="outline" className="border border-gray-300">Cancelled</Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.buyer}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-white ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <a href="#" className="text-blue-500 mr-2">View</a>
                                {order.status === "Pending" && (
                                    <Button className="bg-red-500 text-white">Ship</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}