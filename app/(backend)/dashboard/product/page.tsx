import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function ProductsPage() {
    const products = [
        { id: 1, name: "Premium Cotton T-Shirt", sku: "TS-001", price: "$100", stock: 200, status: "Active" },
        { id: 2, name: "Leather Wallet", sku: "WL-002", price: "$50", stock: 200, status: "Active" },
        { id: 3, name: "Wireless Earbuds", sku: "EB-003", price: "$70", stock: 12, status: "Low Stock" },
        { id: 4, name: "Handcrafted Ceramic Mug", sku: "MG-004", price: "$30", stock: 32, status: "Active" },
        { id: 5, name: "Organic Face Cream", sku: "MG-004", price: "$200", stock: 0, status: "Out of Stock" },
        { id: 6, name: "Bamboo Cutting Board", sku: "CB-006", price: "$20", stock: 5, status: "Low Stock" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-500";
            case "Low Stock":
                return "bg-yellow-500";
            case "Out of Stock":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Products</h2>
                <Link href="/dashboard/addproduct">
                    <Button className="bg-red-500 text-white">+ Add Product</Button>
                </Link>
            </div>
            <div className="flex gap-4 mb-4">
                <div className="w-1/3">
                    <input
                        type="text"
                        placeholder="Search by name or SKU"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Stock Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="low">Low Stock</SelectItem>
                        <SelectItem value="out">Out of Stock</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <div className="w-12 h-12 bg-gray-200"></div>
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-white ${getStatusColor(product.status)}`}>
                                    {product.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <a href="#" className="text-blue-500 mr-2">Edit</a>
                                <a href="#" className="text-red-500">Delete</a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}