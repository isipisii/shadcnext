"use client"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

const NavBar = () => {
  return (
    <nav className="border-b py-3 px-4 flex items-center justify-between fixed w-full bg-inherit">
         <Link href="/">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight bg">
            shadcnext
            </h4>
         </Link>

        <ul className="flex items-center gap-4">
            <Link href="/about">
                <Button variant={"ghost"} >About</Button>
            </Link>
            <Link href={`/product/${1}`}>
            <Button variant={"ghost"} >Product</Button>
            </Link>
            <ModeToggle />
        </ul>
    </nav>
  )
}

export default NavBar