
import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className="text-black font-bold py-2 px-4 rounded">Sign In</button>
    </form>
  )
} 