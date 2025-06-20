"use server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export interface Product extends Record<string, unknown> {
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

interface AddProductParams {
    product: Product;
}

export default async function addProduct({ product }: AddProductParams) {
    try {
        // Basic validation example
        if (
            !product.name ||
            !product.description ||
            !product.category ||
            !product.imageUrl ||
            !product.shopId ||
            typeof product.price !== "number" ||
            typeof product.quantity !== "number"
        ) {
            return {
                success: false,
                error: "Invalid product data. Missing required fields.",
            };
        }

        const productCollection = await dbConnect<Product>(collectionNameObj.productCollection);

        const newProduct = {
            ...product,
            _createdAt: new Date(),
        };

        const result = await productCollection.insertOne(newProduct);

        return {
            success: true,
            insertedId: result.insertedId.toString(), 
        };
    } catch (error) {
        console.error("Failed to add product:", error);
        return {
            success: false,
            error: "Failed to add product due to server error",
        };
    }
}
