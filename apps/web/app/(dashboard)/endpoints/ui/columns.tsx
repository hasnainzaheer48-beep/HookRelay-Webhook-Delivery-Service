"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { type DataTableFeatures } from "./data-table-features"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect, useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import EditEndpointForm from "./editEndpointForm"


export interface Endpoint {
  id: string;
  url: string;
  status: "active" | "paused" | "disabled"
  rateLimitPerSec: number;
  createdAt: Date; 
  updatedAt: Date; 
  userId: string;
  description: string | null;
  secret: string;
  eventTypes: string[];
  disabledReason: string | null;
}


// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Endpoint>()

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("url", {
      header: "URL",
    }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("rateLimitPerSec", {
    header: "Rate Limit Per Sec",
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const endpoint = row.original
 const router = useRouter()
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(endpoint.id)}
            >
              Copy Endpoint ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/endpoints/${endpoint.id}`)} >View Details</DropdownMenuItem>
           <Dialog>
  <DialogTrigger asChild>
    <DropdownMenuItem
      onSelect={(e) => e.preventDefault()}
    >
      Edit Endpoint
    </DropdownMenuItem>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Endpoint</DialogTitle>
      <DialogDescription>
        Edit your endpoint details.
      </DialogDescription>
    </DialogHeader>
    <EditEndpointForm {...endpoint} />
  </DialogContent>
</Dialog>
            <DropdownMenuItem>Delete Endpoint</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])