import { getProviders, signIn } from "next-auth/react"

const FormButton = () => {
  const providers = getProviders().then((res) => {
    console.log(res)
    return res
  })

  return (
    <>
      <button onClick={() => signIn("github", {callbackUrl: "/"})}>github</button>
      <button onClick={() => signIn("google", {callbackUrl: "/"})}>google</button>
    </>
  )
}

export default FormButton;
