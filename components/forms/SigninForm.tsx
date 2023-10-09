"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "../ui/use-toast"
import { AlertDestructive } from "../AlertDestructive"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SigninForm({ className, ...props }: UserAuthFormProps) {
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [signinCredentials, setSigninCredentials] = React.useState<TSigninCredentials>({
    email: "",
    password: ""
  })
  
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    try {
      // this will be sent to the crendentials that has been configured in auth options for authorization
      const res = await signIn("credentials", {
        email: signinCredentials.email,
        password: signinCredentials.password,
        redirect: false
      })
      
      if(res?.error) return setError(res.error), setIsLoading(false)

      toast({
        title: "Signed in Successfully!",
        variant: "successful",
      })
      
      router.replace("/")
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target

    setSigninCredentials(prevState => (
      {...prevState, [name]: value}
    ))
  }

  return (
    <div className={cn("grid gap-6 border p-4 rounded-lg", className)} {...props}>
      <form onSubmit={onSubmit}>
        {error && <AlertDestructive description={error} />}
        <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">
                  Email
              </Label>
              <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  name="email"
                  value={signinCredentials.email}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={handleChange}
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
                  disabled={isLoading}
                  name="password"
                  value={signinCredentials.password}
                  onChange={handleChange}
              />
            </div>
            <Button disabled={isLoading}>
              {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )} */}
              Sign In
            </Button>
        </div>
      </form>
    </div>
  )
}