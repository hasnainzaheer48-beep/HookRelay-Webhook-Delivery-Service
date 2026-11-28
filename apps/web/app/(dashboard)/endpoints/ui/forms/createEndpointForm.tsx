"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEndpoint } from "../../../../../actions/endpoint.actions";
import { useActionState } from "react";
const initialState = {
  message: '',
}


export default function CreateEndpointForm()
{
    const [state, formAction, pending] = useActionState(createEndpoint , initialState )
    
    return(
            <form action={formAction} className="max-w-sm w-full space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="url">URL </Label> 
                    <Input  type="text" id="url" name="url" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="description">Description </Label> 
                    <Input  type="text" id="description" name="description"  />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="eventTypes">Event Types </Label> 
                    <Input  type="text" id="eventTypes" name="eventTypes"  />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="rateLimitPerSec">Rate Limit Per Second </Label> 
                    <Input  type="number" id="rateLimitPerSec" name="rateLimitPerSec" defaultValue={10} required />
                    </div>
                     <p aria-live="polite" className="text-red-600 ">
                    {typeof state?.message === 'string'
                        ? state.message
                        : state?.message
                        ? Object.values(state.message).flat().filter(Boolean).join(', ')
                        : null}
                    </p>
                    <Button type="submit" className="w-full " > Add Endpoint </Button>
                
        </form>
    )
}