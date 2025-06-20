'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Product' },
    { href: '/shop', label: 'Shop' },
]

export default function NavLink() {
    const pathname = usePathname()

    return (
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {links.map((link) => {
                const isActive = pathname === link.href

                return (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={clsx(
                                'transition-colors',
                                isActive
                                    ? 'text-primary font-semibold underline underline-offset-4'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {link.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
