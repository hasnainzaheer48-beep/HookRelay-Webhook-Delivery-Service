"use client"
import { editEndpoint } from "@/actions/endpoint.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  message: '',
}

export default function EditEndpointForm({
    id,
        url,
        rateLimitPerSec,
        description,
        eventTypes,
        onSuccess
    }  :  {
  id: string,
  url: string,
  status: "active" | "paused" | "disabled",
  rateLimitPerSec: number,
  description: string | null,
  eventTypes: string[]
  onSuccess: ()=> void
}
 )

{
    
    const editEndpointWithId = editEndpoint.bind(null, id)
    const [state, formAction, pending] = useActionState(editEndpointWithId, initialState)

    useEffect(()=>{
        if(state.success)
        {
            onSuccess()
            toast.success("Endpoint Edited Successfully")
        }
    },
    [state]
)
    return(
            <form action={formAction} className="max-w-sm w-full space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="url">URL </Label> 
                    <Input  type="text" id="url" name="url" defaultValue={url} required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="description">Description </Label> 
                    <Input  type="text" id="description" name="description" defaultValue={description? description: ""}  />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="eventTypes">Event Types </Label> 
                    <Input  type="text" id="eventTypes" name="eventTypes" defaultValue={eventTypes.join(", ")}  />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="rateLimitPerSec">Rate Limit Per Second </Label> 
                    <Input  type="number" id="rateLimitPerSec" name="rateLimitPerSec" defaultValue={rateLimitPerSec} required />
                    </div>
                     <p aria-live="polite" className="text-red-600 ">
                    {typeof state?.message === 'string'
                        ? state.message
                        : state?.message
                        ? Object.values(state.message).flat().filter(Boolean).join(', ')
                        : null}
                    </p>
                    <Button type="submit" className="w-full " > Edit Endpoint </Button>    
        </form>
    )
}