import { SigninForm } from "@/components/forms/SigninForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SignIn() {
  const session = await getServerSession()

  if(session){
    redirect("/")
  }

  return (
    <SigninForm className="w-full max-w-[400px]"/>
  )
}

