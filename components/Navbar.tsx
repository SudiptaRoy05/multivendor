// components/Navbar.tsx
"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { ModeToggle } from "./toggle-btn"

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
                    MultiV
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden space-x-6 text-sm font-medium md:flex">
                    <li>
                        <Link href="#" className="transition hover:text-primary">Item 1</Link>
                    </li>
                    <li className="relative group">
                        <span className="cursor-pointer transition hover:text-primary">Parent</span>
                        <ul className="absolute hidden w-40 rounded-md bg-popover p-2 shadow group-hover:block">
                            <li><Link href="#" className="block rounded px-2 py-1 hover:bg-accent">Submenu 1</Link></li>
                            <li><Link href="#" className="block rounded px-2 py-1 hover:bg-accent">Submenu 2</Link></li>
                        </ul>
                    </li>
                    <li><Link href="#" className="transition hover:text-primary">Item 3</Link></li>
                </ul>

                {/* Right side (Toggle & CTA) */}
                <div className="flex items-center space-x-2">
                    <ModeToggle />
                    <Link href="/login">
                        <Button variant="default" className="hidden md:inline-flex">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="outline" className="hidden md:inline-flex ">
                            Register
                        </Button>
                    </Link>


                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="flex flex-col space-y-4 mt-6 items-center">
                                <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
                                    MultiV
                                </Link>
                                <Link href="#" className="text-sm font-medium">Item 1</Link>
                                <div>
                                    <p className="text-sm font-medium">Parent</p>
                                    <div className="ml-4 mt-2 space-y-2">
                                        <Link href="#" className="block text-sm">Submenu 1</Link>
                                        <Link href="#" className="block text-sm">Submenu 2</Link>
                                    </div>
                                </div>
                                <Link href="#" className="text-sm font-medium">Item 3</Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
