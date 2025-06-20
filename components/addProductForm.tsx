"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

import imageUpload from "@/app/action/auth/imageUpload";
import { useShop } from "@/app/action/auth/shopContext";
import addProduct from "@/app/action/auth/addProduct";
import Image from "next/image";

interface PricingData {
  price: string;
  salePrice: string;
  quantity: string;
  sku: string;
}

interface FormData {
  name: string;
  description: string;
  category: string;
  pricing: PricingData;
}

export default function AddProductForm() {
  const { selectedShop } = useShop();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  setDragActive(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "Select Category",
    pricing: {
      price: "",
      salePrice: "",
      quantity: "",
      sku: "",
    },
  });

  const categories: string[] = [
    "Select Category",
    "Electronics",
    "Clothing & Fashion",
    "Home & Garden",
    "Books & Media",
    "Sports & Outdoors",
    "Health & Beauty",
    "Toys & Games",
    "Automotive",
    "Food & Beverages",
    "Art & Crafts",
    "Jewelry & Accessories",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("pricing.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageFile = async (file: File) => {
    setSelectedImage(file);
    const toastId = toast.loading("Uploading image...");
    setUploading(true);

    try {
      const uploadedUrl = await imageUpload(file);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        toast.success("Image uploaded successfully", { id: toastId });
      } else {
        toast.error("Failed to upload image", { id: toastId });
      }
    } catch (error) {
      toast.error("Error uploading image", { id: toastId });
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedShop) {
      toast.error("Please select a shop before submitting.");
      return;
    }

    if (
      !formData.name ||
      !formData.description ||
      !formData.pricing.price ||
      !formData.pricing.quantity
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.category === "Select Category") {
      toast.error("Please select a valid category");
      return;
    }

    if (!imageUrl) {
      toast.error("Please upload at least one image");
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      imageUrl: imageUrl,
      price: Number(formData.pricing.price),
      quantity: Number(formData.pricing.quantity),
      salePrice: formData.pricing.salePrice ? Number(formData.pricing.salePrice) : undefined,
      sku: formData.pricing.sku,
      shopId: selectedShop._id,
    };

    try {
      await addProduct({ product: productData });
      toast.success("Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "Select Category",
        pricing: {
          price: "",
          salePrice: "",
          quantity: "",
          sku: "",
        },
      });
      setImageUrl("");
      setSelectedImage(null);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  disabled={cat === "Select Category"}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                name="pricing.price"
                value={formData.pricing.price}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale Price
              </label>
              <input
                type="number"
                name="pricing.salePrice"
                value={formData.pricing.salePrice}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="pricing.quantity"
                value={formData.pricing.quantity}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                name="pricing.sku"
                value={formData.pricing.sku}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-12 px-6 text-center border rounded">
            <label className="cursor-pointer group">
              <div
                className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center mb-4 border-2 transition-all duration-300 ${dragActive
                  ? "bg-red-50 border-red-400 border-dashed"
                  : "bg-gray-50 border-dashed border-gray-300 group-hover:border-gray-500"
                  }`}
              >
                <Upload
                  className={`w-10 h-10 transition-colors duration-300 mb-2 ${dragActive
                    ? "text-red-500"
                    : "text-gray-500 group-hover:text-gray-700"
                    }`}
                />
                <span
                  className={`text-sm ${dragActive
                    ? "text-red-500"
                    : "text-gray-500 group-hover:text-gray-700"
                    }`}
                >
                  {dragActive ? "Drop to upload" : "Upload image"}
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {selectedImage ? (
                <div className="mt-2">
                  <p className="text-green-600 font-medium">
                    {selectedImage.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Click to change</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 font-medium mb-1">
                    <span className="text-red-600 underline">Browse files</span>{" "}
                    or drag & drop
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports JPG, PNG, GIF (Max 10MB)
                  </p>
                </>
              )}

              {imageUrl && (
                <div className="mt-6 p-2 border-2 border-dashed border-gray-200 rounded-lg">
                  <Image
                    fill
                    src={imageUrl}
                    alt="Uploaded Product"
                    className="mx-auto rounded-md max-h-48 object-contain"
                  />
                </div>
              )}
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
            >
              {uploading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}