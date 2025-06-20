
import { auth } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export type ShopType = {
    _id: ObjectId;
    name: string; // Remove the ? to make it required
    email: string;
    description: string;
    category: string;
    image: string;
    ownerEmail: string;
    _createdAt: Date;
};

export default async function getShop() {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
        return null;
    }

    const shopCollection = await dbConnect<ShopType>(collectionNameObj.shopCollection);
    const shop = await shopCollection.find({ ownerEmail: email }).toArray();
    console.log(shop);
    return shop;
}