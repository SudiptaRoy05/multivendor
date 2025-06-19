import Link from "next/link"
import { Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./toggle-btn"
import { auth, signOut } from "@/auth"

const Navbar = async () => {
    const session = await auth();
    console.log(session?.user)

    // Get user initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
    }

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

                {/* Right side (Toggle & Auth) */}
                <div className="flex items-center space-x-2">
                    <ModeToggle />

                    {session?.user ? (
                        /* Authenticated User */
                        <div className="hidden md:flex items-center space-x-3">
                            <span className="text-sm text-muted-foreground">
                                Welcome, {session.user.name || session.user.email}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                                            <AvatarFallback>
                                                {session.user.name ? getInitials(session.user.name) : <User className="h-4 w-4" />}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            {session.user.name && (
                                                <p className="font-medium">{session.user.name}</p>
                                            )}
                                            {session.user.email && (
                                                <p className="w-[200px] truncate text-sm text-muted-foreground">
                                                    {session.user.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <form
                                            action={async () => {
                                                "use server"
                                                await signOut({ redirectTo: "/" })
                                            }}
                                        >
                                            <button type="submit" className="flex w-full items-center">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sign out
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        /* Unauthenticated User */
                        <div className="hidden md:flex items-center space-x-2">
                            <Link href="/login">
                                <Button variant="default">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="outline">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}

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

                                {/* Mobile Auth Section */}
                                <div className="border-t pt-4 w-full">
                                    {session?.user ? (
                                        <div className="flex flex-col items-center space-y-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                                                <AvatarFallback>
                                                    {session.user.name ? getInitials(session.user.name) : <User className="h-6 w-6" />}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-center">
                                                <p className="font-medium">{session.user.name}</p>
                                                <p className="text-sm text-muted-foreground">{session.user.email}</p>
                                            </div>
                                            <Link href="/dashboard" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                            <form
                                                action={async () => {
                                                    "use server"
                                                    await signOut({ redirectTo: "/" })
                                                }}
                                                className="w-full"
                                            >
                                                <Button type="submit" variant="ghost" size="sm" className="w-full">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Sign out
                                                </Button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-2">
                                            <Link href="/login">
                                                <Button variant="default" className="w-full">
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link href="/register">
                                                <Button variant="outline" className="w-full">
                                                    Register
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;