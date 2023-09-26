"use client"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

const NavBar = () => {
  return (
    <nav className="border-b py-3 px-4 flex items-center justify-between fixed w-full">
         <Link href="/">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            shadcnext
            </h4>
         </Link>

        <ul className="flex items-center gap-8">
            <Link href="/about">
                <li>About</li>
            </Link>
            <Link href={`/product/${1}`}>
                <li>Product</li>
            </Link>
            <ModeToggle />
        </ul>
    </nav>
  )
}

export default NavBar