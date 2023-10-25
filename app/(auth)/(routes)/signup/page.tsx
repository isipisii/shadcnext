import { SignupForm } from "@/components/forms/SignupForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SignUp(){
  const session = await getServerSession()

  if(session){
    redirect("/")
  }

  return (
    <SignupForm className="w-full max-w-[400px]"/>
  )
}
