"use client";

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    CreditCard,
    Store,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useShop } from "@/app/action/auth/shopContext";


type Shop = {
    _id: string;
    name: string;
};

type SellerAsideProps = {
    shop: Shop[];
};

export default function SellerAside({ shop }: SellerAsideProps) {
    const pathname = usePathname();
    const { selectedShop, setSelectedShop } = useShop();

    // Auto-select first shop if none selected
    useEffect(() => {
        if (shop?.length && !selectedShop) {
            setSelectedShop(shop[0]);
        }
    }, [shop, selectedShop, setSelectedShop]);

    const linkClass = (path: string) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${pathname === path
            ? "bg-primary/10 text-primary font-semibold"
            : "hover:bg-muted text-muted-foreground"
        }`;

    return (
        <aside className="w-64 border-r px-4 py-6">
            {/* Dynamic Shop Dropdown */}
            <div className="mb-6">
                <Select
                    value={selectedShop?._id}
                    onValueChange={(value) => {
                        const found = shop.find((s) => s._id === value);
                        if (found) setSelectedShop(found);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Shop" />
                    </SelectTrigger>
                    <SelectContent>
                        {shop.map((s) => (
                            <SelectItem key={s._id} value={s._id}>
                                {s.name ?? "Unnamed Shop"}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <nav className="space-y-2">
                <Link href="/dashboard" className={linkClass("/dashboard")}>
                    <LayoutDashboard className="w-5 h-5" />
                    Overview
                </Link>
                <Link href="/dashboard/product" className={linkClass("/dashboard/product")}>
                    <Package className="w-5 h-5" />
                    Products
                </Link>
                <Link href="/dashboard/order" className={linkClass("/dashboard/order")}>
                    <ShoppingCart className="w-5 h-5" />
                    Orders
                </Link>
                <Link href="/payments" className={linkClass("/payments")}>
                    <CreditCard className="w-5 h-5" />
                    Payments
                </Link>
                <Link href="/dashboard/createshop" className={linkClass("/dashboard/createshop")}>
                    <Store className="w-5 h-5" />
                    Create Shop
                </Link>
                <Link href="/dashboard/profile" className={linkClass("/dashboard/profile")}>
                    <User className="w-5 h-5" />
                    Profile
                </Link>
            </nav>
        </aside>
    );
}
