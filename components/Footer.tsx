import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t text-foreground">
            <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4 sm:grid-cols-2 text-sm">
                {/* Brand */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-primary">MultiV</h3>
                    <p className="text-muted-foreground mb-2">
                        Discover and sell unique products across categories.
                    </p>
                    <p className="text-muted-foreground text-xs">
                        © {new Date().getFullYear()} MultiV. All rights reserved.
                    </p>
                </div>

                {/* Shop Links */}
                <div>
                    <h4 className="font-semibold mb-4">Shop</h4>
                    <ul className="space-y-2">
                        <li><Link href="/product" className="hover:underline">All Products</Link></li>
                        <li><Link href="/categories" className="hover:underline">Categories</Link></li>
                        <li><Link href="/shop" className="hover:underline">Shops</Link></li>
                    </ul>
                </div>

                {/* Vendor Links */}
                <div>
                    <h4 className="font-semibold mb-4">Vendors</h4>
                    <ul className="space-y-2">
                        <li><Link href="/register" className="hover:underline">Become a Vendor</Link></li>
                        <li><Link href="/login" className="hover:underline">Vendor Login</Link></li>
                        <li><Link href="/dashboard" className="hover:underline">Vendor Dashboard</Link></li>
                    </ul>
                </div>

                {/* Contact + Social */}
                <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            support@multiv.com
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            +1 (234) 567-890
                        </li>
                    </ul>

                    <div className="flex gap-4 mt-4 text-muted-foreground">
                        <a href="#" className="hover:text-primary"><Facebook className="w-4 h-4" /></a>
                        <a href="#" className="hover:text-primary"><Instagram className="w-4 h-4" /></a>
                        <a href="#" className="hover:text-primary"><Twitter className="w-4 h-4" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
