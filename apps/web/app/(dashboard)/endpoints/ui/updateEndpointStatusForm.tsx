"use client"
import { editEndpoint } from "@/actions/endpoint.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionState } from "react";

interface endpointData{
    status: "active" | "paused",
    userId: string,
    id: string
}

const initialState = {
  message: '',
}


export default function EditEndpointStatusForm(endpointData :  endpointData )
{
    const {id,
        status
    } = endpointData
    const editEndpointStatusWithId = editEndpointStatus.bind(null, id)
    const [state, formAction, pending] = useActionState(editEndpointStatusWithId, initialState)
    return(
            <form action={formAction} className="max-w-sm w-full space-y-4">
                    
                
                    <Select name="status" required>
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select Status" defaultValue={status} />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                        <SelectItem id="active" value="active" >Active</SelectItem>
                        <SelectItem id="paused" value="paused">Paused</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>   


                     <p aria-live="polite" className="text-red-600 ">
                    {typeof state?.message === 'string'
                        ? state.message
                        : state?.message
                        ? Object.values(state.message).flat().filter(Boolean).join(', ')
                        : null}
                    </p>
                    <Button type="submit" className="w-full " > Edit Endpoint Status </Button>    
        </form>
    )
}