"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EditEndpointForm from "../forms/editEndpointForm";
import { useState } from "react";

export function EditEndpointDialogue(endpoint: {id: string;
  url: string;
  status: "active" | "paused" | "disabled"
  rateLimitPerSec: number;
  createdAt: Date; 
  description: string | null;
  eventTypes: string[];})
{
    const [open, setOpen] = useState(false)
    return(
        <Dialog open={open} onOpenChange={setOpen} >
  <DialogTrigger >
    Edit Endpoint
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Endpoint</DialogTitle>
      <DialogDescription>
        Edit your endpoint details.
      </DialogDescription>
    </DialogHeader>
    <EditEndpointForm {...endpoint}  onSuccess={()=> setOpen(false)} />
  </DialogContent>
</Dialog>
    )
}