"use client"
import { deleteEndpoint } from "@/actions/endpoint.actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface data {
    id: string
}

export function DeleteEndpointButton({id}: data)
{

    const [open, setOpen] = useState(false)
      const [isPending, startTransition] = useTransition()
      
function handleDelete(id: string) {
  startTransition(async () => {
    const result = await deleteEndpoint(id)
    if(result.success)
    {
      setOpen(false)
      toast.success("Endpoint Deleted")
    }
    else {
      toast.error(result.message)
    }
  })
}
    return(
         <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
       <Button variant={"destructive"}>Delete</Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Endpoint</DialogTitle>
      <DialogDescription>
        Delete Confirmation
      </DialogDescription>
    </DialogHeader>
    Are you sure you want to delete this endpoint? 
    <Button disabled={isPending} onClick={() =>handleDelete(id)} variant={"destructive"}>{isPending? "Deleting" : "Delete Endpoint"}</Button>
  </DialogContent>
</Dialog>

    )
}