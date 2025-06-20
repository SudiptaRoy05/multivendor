"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Users, Star } from "lucide-react";
import Link from "next/link";

export default function FeatureProduct() {
  const featuredProducts = [
    {
      name: "Wireless Headphones",
      price: "$199",
      category: "Electronics",
      rating: 4.8,
    },
    {
      name: "Organic Face Cream",
      price: "$49",
      category: "Beauty",
      rating: 4.5,
    },
    {
      name: "Bamboo Cutting Board",
      price: "$25",
      category: "Kitchen",
      rating: 4.2,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white dark:from-muted/40 dark:to-background">
        <div className="container mx-auto px-4 py-20 text-center md:text-left">
          <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200">
            Trusted by 10,000+ Vendors
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Discover <span className="text-red-600">Endless</span> Possibilities
            <br />
            in One Marketplace
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            Shop, sell, and grow your business with MultiV’s smart marketplace platform.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="/product">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{product.category}</p>
                <p className="text-lg font-semibold mb-2">{product.price}</p>
                <Badge variant="secondary" className="flex items-center w-fit">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Join Vendor CTA */}
      <section className="bg-muted py-16 dark:bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Marketplace</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Create your shop, list your products, and reach thousands of customers globally.
          </p>
          <Link href="/register">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Become a Vendor
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
