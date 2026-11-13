"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { signOut } from "@/lib/auth-client";
import {toast} from "sonner"

export default function SignOutButton()
{
    const router = useRouter();
    const handleClick = async() => {
        await signOut({
            fetchOptions: {
                onError: (err) => { toast.error(err.error.message) }, 
                onSuccess:  () => { router.push("/auth/login") }
            }
        })
    }

    return(
            <div>
            <Button onClick={handleClick} size='sm' variant="destructive" >Sign Out</Button>
            </div>
        )
}