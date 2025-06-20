"use client";

import { Bell, Globe, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

type DashboardNavProps = {
    user: { name?: string; email?: string; role?: string; } | null;
};

export default function DashboardNavbar({ user }: DashboardNavProps) {
    console.log(user)
    const name = user?.name || "Guest";
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    // Dynamic categories (can be fetched or imported from config)
    const categories = ["Electronics", "Fashion", "Home", "Books", "Sports"];

    return (
        <div className="h-30 border-b bg-white shadow-sm w-full">
            <div>
                {/* Top Navbar */}
                <div className="flex items-center justify-between px-6 py-2">
                    <div className="text-2xl font-bold text-red-500">MultiV</div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                        {/* Language */}
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
                            <Globe size={18} />
                            <span>EN</span>
                        </div>

                        {/* Help */}
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
                            <HelpCircle size={18} />
                            <span>Help</span>
                        </div>

                        {/* Notifications */}
                        <div className="relative cursor-pointer">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 inline-block w-2 h-2 bg-red-500 rounded-full" />
                        </div>

                        {/* User */}
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <span>{name}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 my-2" />

                {/* Search Bar */}
                <div className="flex items-center gap-4 px-6 pb-4">
                    <Select>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.toLowerCase()} value={cat.toLowerCase()}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        type="text"
                        placeholder="Search by product, brand, or keyword"
                        className="flex-1"
                    />

                    <Button variant="default" className="bg-red-500 hover:bg-red-600">
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}
