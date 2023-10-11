"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "../ui/use-toast"

import { useRouter } from "next/navigation";
import Link from "next/link"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}


export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [signUpCredentials, setSignUpCredentials] = React.useState<TSignupCredentials>({
    name: "",
    password: "",
    email: ""
  })
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/signup", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(signUpCredentials),
      })
      
      console.log(await res.json())
      toast({
        title: "Account Created Successfully!",
        variant: "successful",
        description: "You can now sign in your account"
      })
      router.replace("/signin")
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target

    setSignUpCredentials(prevState => (
      {...prevState, [name]: value}
    ))
  }

  return (
    <div className={cn("grid gap-6 border p-4 rounded-lg", className)} {...props}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <h1 className="text-xl font-semibold">Create Account</h1>
        <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="text">
                  Name
              </Label>
              <Input
                  id="text"
                  placeholder="e.g. John Doe"
                  type="text"
                  disabled={isLoading}
                  name="name"
                  value={signUpCredentials.name}
                  onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                  Email
              </Label>
              <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  name="email"
                  value={signUpCredentials.email}
                  onChange={handleChange}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                  Password
              </Label>
                <Input
                  id="password"
                  placeholder="••••••"
                  type="password"
                  name="password"
                  value={signUpCredentials.password}
                  disabled={isLoading}
                  onChange={handleChange}
              />
            </div>
            <Button disabled={isLoading}>
              {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )} */}
              Sign Up
            </Button>
        </div>
        <p className="text-sm text-center">Have an account? <Link href="/signin">Sign in</Link></p>
      </form>
    </div>
  )
}