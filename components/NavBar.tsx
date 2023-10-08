"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import SideCart from "./SideCart"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"


function NavBar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";


  return (
    <nav className="border-b py-3 px-4 flex items-center justify-between fixed w-full bg-inherit z-[30]">
      <Link href="/">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight bg">
          shadcnext {session?.user?.id} {session?.user?.name} {session?.user?.email}
        </h4>
      </Link>

      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <SideCart />
          <ModeToggle />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      )}
    </nav>
  )
}

export default NavBar