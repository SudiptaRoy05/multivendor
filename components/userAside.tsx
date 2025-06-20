"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  Store,
  User,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

export default function UserAside() {
  return (
    <aside className="w-64 border-r px-4 py-6">
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <LayoutDashboard className="w-5 h-5" />
          Overview
        </Link>

        <Link href="/dashboard/product" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <Package className="w-5 h-5" />
          Products
        </Link>

        <Link href="/dashboard/order" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <ShoppingCart className="w-5 h-5" />
          Orders
        </Link>

        <Link href="/payments" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <CreditCard className="w-5 h-5" />
          Payments
        </Link>

        <Link href="/dashboard/createshop" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <Store className="w-5 h-5" />
          Create Shop
        </Link>

        {/* <Link href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <SlidersHorizontal className="w-5 h-5" />
          Settings
        </Link> */}

        <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <User className="w-5 h-5" />
          Profile
        </Link>
      </nav>
    </aside>
  );
}
