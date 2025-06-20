"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useShop } from "@/app/action/auth/shopContext";
import getProduct from "@/app/action/auth/getProduct";
import toast from "react-hot-toast";
import Image from "next/image";

interface Product {
    _id: string; // Plain string, not ObjectId
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    shopId: string; // Plain string, not ObjectId
    price: number;
    salePrice?: number;
    quantity: number;
    sku: string; // Now required with fallback
    _createdAt?: Date;
    // Computed properties for display
    stock: number;
    status: string;
}

export default function ProductsPage() {
    const { selectedShop } = useShop();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedShop?._id) return;

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            const loadingToast = toast.loading("Fetching products...");

            try {
                const res = await getProduct({
                    shopId: selectedShop._id
                });

                if (!res.success) throw new Error(res.error || "Failed to fetch products");

                // Data is already serialized from server
                const transformedProducts = res.products?.map(product => ({
                    ...product,
                    sku: product.sku || 'N/A',
                    stock: product.quantity,
                    status: getProductStatus(product.quantity),
                })) ?? [];
                
                setProducts(transformedProducts);
                toast.success("Products loaded successfully!", { id: loadingToast });
            } catch (err: any) {
                setError(err.message || "Unknown error occurred");
                toast.error(err.message || "Failed to fetch products", { id: loadingToast });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedShop?._id]);

    const getProductStatus = (quantity: number): string => {
        if (quantity === 0) return "Out of Stock";
        if (quantity < 10) return "Low Stock";
        return "Active";
    };

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

    if (!selectedShop) return <p>Please select a shop to view products.</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Products for {selectedShop.name}</h2>
                <Link href="/dashboard/addproduct">
                    <Button className="bg-red-500 text-white">+ Add Product</Button>
                </Link>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
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
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        {product.imageUrl ? (
                                            <Image
                                                fill
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded"></div>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.stock ?? 0}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-white ${getStatusColor(
                                                product.status
                                            )}`}
                                        >
                                            {product.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <a href="#" className="text-blue-500 mr-2">
                                            Edit
                                        </a>
                                        <a href="#" className="text-red-500">
                                            Delete
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}