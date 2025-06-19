'use server'
import { auth } from "@/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export type UserType = {
    _id: ObjectId;
    name?: string;
    email: string;
    role?: "admin" | "seller" | "customer";
    [key: string]: any;
};

export default async function updateUser({ role }: { role: UserType["role"] }) {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
        throw new Error("User not authenticated.");
    }

    const userCollection = await dbConnect<UserType>(collectionNameObj.userCollection);

    const user = await userCollection.findOne({ email });


    const result = await userCollection.updateOne(
        { email },
        { $set: { role } }
    );

    console.log("Updated user:", result);

    return result.modifiedCount > 0
        ? { success: true, message: "User role updated successfully." }
        : { success: false, message: "No changes were made." };
}
