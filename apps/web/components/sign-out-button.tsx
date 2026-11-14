"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { signOut } from "@/lib/auth-client";
import {toast} from "sonner"
import { LogOut } from "lucide-react";


interface SignOutButtonProps {
  collapsed?: boolean;
}

export default function SignOutButton({collapsed = false}: SignOutButtonProps)
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
            <Button
                onClick={handleClick}
                size="sm"
                variant="destructive"
                className="w-full">
            <LogOut />{!collapsed && "Sign Out"}
            </Button>
        )
}