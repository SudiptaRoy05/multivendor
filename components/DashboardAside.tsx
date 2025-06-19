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
import { usePathname } from "next/navigation";

type DashboardAsideProps = {
  user: {
    role?: string;
  } | null;
};

export default function DashboardAside({ user }: DashboardAsideProps) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";
  const isSeller = user?.role === "seller";
  const isCustomer = user?.role === "user"; // or "customer" if that's your actual role

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-red-100 text-red-600 font-semibold"
        : "hover:bg-gray-100 text-gray-700 cursor-pointer"
    }`;

  return (
    <aside className="w-64 border-r px-4 py-6">
      <nav className="space-y-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard className="w-5 h-5" />
          Overview
        </Link>

        {(isAdmin || isSeller) && (
          <Link href="/dashboard/product" className={linkClass("/dashboard/product")}>
            <Package className="w-5 h-5" />
            Products
          </Link>
        )}

        {(isAdmin || isSeller) && (
          <Link href="/dashboard/order" className={linkClass("/dashboard/order")}>
            <ShoppingCart className="w-5 h-5" />
            Orders
          </Link>
        )}

        {isAdmin && (
          <Link href="/payments" className={linkClass("/payments")}>
            <CreditCard className="w-5 h-5" />
            Payments
          </Link>
        )}

        {(isSeller || isCustomer) && (
          <Link href="/dashboard/createshop" className={linkClass("/createshop")}>
            <Store className="w-5 h-5" />
            Create Shop
          </Link>
        )}

        {(isAdmin || isSeller || isCustomer) && (
          <Link href="/settings" className={linkClass("/settings")}>
            <SlidersHorizontal className="w-5 h-5" />
            Settings
          </Link>
        )}

        <Link href="/dashboard/profile" className={linkClass("/dashboard/profile")}>
          <User className="w-5 h-5" />
          Profile
        </Link>
      </nav>
    </aside>
  );
}
