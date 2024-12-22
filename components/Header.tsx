"use client";
// import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Header() {
    const { user, isLoading } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    // console.log('user', user);
    const menu = [
        {
            name: "Home",
            link: "/",
            icon: "abc"
        },
        {
            name: "Favorites",
            link: "/favorites",
            icon: "abc"
        },
        {
            name: "Bookmark",
            link: "/bookmark",
            icon: "abc"
        },
    ]

    if (isLoading) return null;

    return (
        <header className="min-h-[10vh] px-16 py-6 w-full bg-white flex justify-between items-center shadow-sm">
            <Link href="/">
                <Image src={"/next.svg"} width={120} height={120} alt="logo" />
            </Link>

            {
                user?.sub && <nav>
                    <ul className="flex items-center gap-8 text-gray-400">
                        {menu && menu.map((menu, index: number) => {
                            return (
                                <li key={index} className={`py-2 px-6 flex items-center gap-2 font-bold rounded-lg hover:bg-red-300 hover:text-white ${pathname === menu.link ? 'bg-red-500 text-white' : ''}`}>
                                    <Link href={menu.link}>{menu.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            }

            {
                user?.sub ?
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold text-black">{user.name || "guest"}</h2>
                        <button onClick={() => router.push("/api/auth/logout")}>Logout</button>
                    </div> :
                    (<div className="flex items-center gap-4">
                        <Link href="/api/auth/login">Login</Link>
                        <Link href="/api/auth/login">Sign Up</Link>
                    </div>)
            }
        </header>
    )
}
