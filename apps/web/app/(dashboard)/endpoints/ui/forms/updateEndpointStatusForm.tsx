"use client"
import {  editEndpointStatus } from "@/actions/endpoint.actions";
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EndpointStatus } from "@hookrelay/shared/src/generated/prisma/enums";
import { useActionState } from "react";

interface endpointData{
    status: EndpointStatus,

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
                    
                
                    <Select name="status" required defaultValue={status}>
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select Status"  />
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
                        ? Object.values(state).flat().filter(Boolean).join(', ')
                        : null}
                    </p>
                    <Button type="submit" className="w-full " > Edit Endpoint Status </Button>    
        </form>
    )
}