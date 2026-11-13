"use client"

import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function LoginForm()
{
    const router = useRouter();
    const handleSubmit = async(evt: React.FormEvent<HTMLFormElement> ) => {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement)

        const email = String(formData.get("email"));
        if(!email) return toast.error("Please Enter Your Email");
        const password = String(formData.get("password"));
        if(!password) return toast.error("Please Enter Your Password");

        await signIn.email({
            email,
            password
        },
        {
            onRequest: () => {},
            onResponse: () => {},
            onError: (err) => {
                toast.error(err.error.message);
            },
            onSuccess: () => { router.push("/dashboard")
                router.refresh();
             }
        }
    )
       
    }

    const handleRegister = () => {
        router.push("/auth/register")
    }

    return <>
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
        <div className="space-y-2">
        <Label htmlFor="email">Email </Label> 
        <Input  type="email" id="email" name="email" />
        </div>
        <div className="space-y-2">
        <Label htmlFor="password">Password </Label> 
        <Input  type="password" id="password" name="password" />
        </div>
        <Button type="submit" className="w-full " > Login </Button>
        <Button type="button" className="w-full " onClick={handleRegister}> Register </Button>
    </form>;

    </>
}