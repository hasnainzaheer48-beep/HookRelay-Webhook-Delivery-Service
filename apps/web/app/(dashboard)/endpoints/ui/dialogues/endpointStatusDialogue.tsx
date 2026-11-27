"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EditEndpointStatusForm from "../forms/updateEndpointStatusForm";
import { useState } from "react";
import { EndpointStatus } from "@hookrelay/shared/src/generated/prisma/enums";

export function EndpointStatusDialogue({id, status} :{
    id: string,
    status: EndpointStatus
})
{
    const [open, setOpen] = useState(false)
    return(
        
        
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"lg"}>    
                Update Endpoint Status
                </Button>
                </DialogTrigger>
            <DialogContent>
            <DialogHeader>
            <DialogTitle>Update Endpoint Status</DialogTitle>
            <DialogDescription>
                    Update the status of endpoint
            </DialogDescription>
            </DialogHeader>
            {
                status !== 'disabled' &&
            <EditEndpointStatusForm status={status} id={id} onSuccess = {() => setOpen(false)} /> 
            }
            </DialogContent>
            </Dialog>
)

}