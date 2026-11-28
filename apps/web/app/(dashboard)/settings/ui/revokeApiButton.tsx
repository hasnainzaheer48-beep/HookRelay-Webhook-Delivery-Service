"use client"

import { revokeAPI } from "@/actions/setting.actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "radix-ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export function RevokeAPIButton({id}: {id: string})
{
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    async function handleRevoke()
    {
        setIsPending(true)
        try {
            const result = await revokeAPI({id})
            if(result.success)
                { 
                    toast.success("API Key revoked successfully")
                    setIsOpen(false)
                }
            else toast.error(result.message)
            
        } catch (error) {
            console.error(error)
            throw new Error("Something went wrong")
        }
        finally{
            setIsPending(false)
        }

    }

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
            <Button variant={"destructive"}>Revoke</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confrim Revoke</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to Revoke this Key?
                        This action is irresversible.
                    </DialogDescription>
                </DialogHeader>

                <Button onClick={handleRevoke} variant={"destructive"} disabled={isPending} >{isPending? "Revoking" : "Confirm Delete"}</Button>
            </DialogContent>
        </Dialog>
    )
}