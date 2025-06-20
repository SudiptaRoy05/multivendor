'use server';

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";

import { ObjectId, WithId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  name?: string;
  email: string;
  role?: "admin" | "seller" | "customer";
  [key: string]: any;
};

export default async function getUser(): Promise<WithId<UserType> | null> {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return null;
  }

  const userCollection = await dbConnect<UserType>("users"); 
  const user = await userCollection.findOne({ email });
  console.log(user)

  return user;
}
