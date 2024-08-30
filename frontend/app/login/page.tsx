"use client"

import { useSession } from "next-auth/react";
import FormButton from "./FormButton";

const LoginPage = () => {
  const {data:session} = useSession()
  console.log(session)
  return (
    <>
      <FormButton />
    </>
  )
}

export default LoginPage;
