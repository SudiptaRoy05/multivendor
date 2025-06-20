'use server';

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

interface GetProductParams {
    shopId: string;
}

interface MongoProduct extends Record<string, unknown> {
    _id: ObjectId;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    shopId: ObjectId | string;
    price: number;
    salePrice?: number;
    quantity: number;
    sku?: string;
    _createdAt?: Date;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    shopId: string;
    price: number;
    salePrice?: number;
    quantity: number;
    sku?: string;
    _createdAt?: Date;
}

export default async function getProduct({ shopId }: GetProductParams) {
    try {
        if (!shopId) throw new Error("shopId is required");

        const productCollection = await dbConnect<MongoProduct>(collectionNameObj.productCollection);

        const products = await productCollection
            .find({ shopId }) 
            .sort({ _createdAt: -1 }) 
            .toArray();

        const serializedProducts: Product[] = products.map(product => ({
            _id: product._id.toString(),
            name: product.name,
            description: product.description || '',
            category: product.category || '',
            imageUrl: product.imageUrl || '',
            shopId: typeof product.shopId === 'string' ? product.shopId : product.shopId.toString(),
            price: Number(product.price),
            salePrice: product.salePrice ? Number(product.salePrice) : undefined,
            quantity: Number(product.quantity),
            sku: product.sku || undefined,
            _createdAt: product._createdAt ? new Date(product._createdAt) : undefined,
        }));

        return {
            success: true,
            products: serializedProducts,
        };
    } catch (error) {
        console.error("Failed to get products:", error);
        return {
            success: false,
            error: "Failed to get products",
        };
    }
}