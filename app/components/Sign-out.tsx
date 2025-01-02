import { signOut } from "@/auth"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
   
      <button type="submit" className="text-black font-bold py-2 px-4 rounded">Sign Out</button>
    </form>
  )
}