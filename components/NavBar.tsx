"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import SideCart from "./SideCart"

function NavBar() {
  return (
    <nav className="border-b py-3 px-4 flex items-center justify-between fixed w-full bg-inherit z-[30]">
         <Link href="/">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight bg">
            shadcnext
            </h4>
         </Link>

        <div className="flex items-center gap-4">
            <SideCart />
            <ModeToggle />
        </div>
    </nav>
  )
}

export default NavBar