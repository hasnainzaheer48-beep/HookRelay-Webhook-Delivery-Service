"use client"

import { createAPI } from "@/actions/setting.actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"

export function CreateAPISecretDialogue()
{
    const [isOpen, setOpen] = useState(false)
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    
    function handleDone()
    {
        setApiKey(null)
        setOpen(false)
    }

    async function handleCreate(formData: FormData)
    {
        setIsPending(true)
        setError(null)
        try{
            const result = await createAPI(formData)
            if(result.success) setApiKey(result.key ?? null)
            else setError(result.message?? null)
        }
        catch{
            setError("something went Wrong")
        }
        finally{
            setIsPending(false)
        }
    }


    function handleOpenChange(next: boolean)
    {
        if(!next && apiKey) return
        setOpen(next)
        if(!next) setError(null)
    }

    async function handleCopy()
    {
        if(!apiKey) return
        try{
            await navigator.clipboard.writeText(apiKey)
            toast.success("Key Copied")
        }
        catch{
            toast.error("Could not copy, select it manually")
        }
    }
    return(
        <Dialog open={isOpen} onOpenChange={handleOpenChange} >
            <DialogTrigger asChild>
                <Button variant={"outline"}> Create API Secret</Button>
            </DialogTrigger>
            <DialogContent 
            onInteractOutside={(e)=> {if(apiKey) e.preventDefault()} }
            onEscapeKeyDown ={(e)=> {if(apiKey) e.preventDefault()} }
            >
                {
                    apiKey? (<>
                    <DialogHeader>
                            <DialogTitle>Your new API key</DialogTitle>
                            <DialogDescription>
                                Copy it now. For security it will not be shown again.
                            </DialogDescription>
                        </DialogHeader>
                        <code className="block break-all rounded bg-muted p-2 text-sm">{apiKey}</code>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleCopy}>Copy</Button>
                            <Button onClick={handleDone}>Done</Button>
                        </div>
                    </>) : (
                     <>
                <DialogHeader>
                    <DialogTitle>Create API Secret</DialogTitle>
                    <DialogDescription>Give the key a name so you can recognise it later</DialogDescription>
                </DialogHeader>
                        <form action={handleCreate} className="max-w-sm w-full space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="name">name </Label> 
                            <Input  type="text" id="name" name="name" required />
                            </div>
                            {error && <p className="text-red-600">{error}</p>}
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? "Creating..." : "Create key"}
                                    </Button>     
                        </form>
                     </>   
                    )
                }
            </DialogContent>
        </Dialog>
    )
}