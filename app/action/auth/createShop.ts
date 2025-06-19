'use server'

import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

export interface Shop extends Record<string, unknown> {
  name: string
  description: string
  category: string
  imageUrl: string
  ownerEmail: string
  _createdAt?: Date
}

type ShopDetails = {
  name: string
  description: string
  category: string
  imageUrl: string
  userEmail: string
}

export default async function createShop({
  shopDetails,
}: {
  shopDetails: ShopDetails
}) {
  try {
    const shopCollection = await dbConnect<Shop>(collectionNameObj.shopCollection)

    const newShop: Shop = {
      name: shopDetails.name,
      description: shopDetails.description,
      category: shopDetails.category,
      imageUrl: shopDetails.imageUrl,
      ownerEmail: shopDetails.userEmail,
      _createdAt: new Date(),
    }

    const result = await shopCollection.insertOne(newShop)

    return {
      success: true,
      message: "Shop created successfully",
      shopId: result.insertedId.toString(),  // <-- convert ObjectId to string here
    }
  } catch (error) {
    console.error("Failed to create shop:", error)
    return {
      success: false,
      message: "Error occurred while creating shop",
    }
  }
}
