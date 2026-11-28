"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "../../../../../components/ui/data-table-features"
import { RevokeAPIButton } from "../revokeApiButton";
import { Button } from "@/components/ui/button";




export interface Api {
  id: string;
  name: string;
  keyPrefix: string;
  lastUsedAt: Date | null;
  createdAt: Date; 
  revokedAt: Date | null;
 
}


// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Api>()

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
      header: "Id",
    
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
  columnHelper.accessor("keyPrefix", {
    header: "Key Prefix",

  }),
  columnHelper.accessor("lastUsedAt", {
    header: "Last Used At",
    cell: ({getValue}) => (getValue()? getValue()?.toLocaleDateString() : '-')
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
        cell: ({getValue}) => (getValue()? getValue()?.toLocaleDateString() : '-')
  }),
  columnHelper.accessor("revokedAt", {
    header: "Revoked At",
        cell: ({getValue}) => (getValue()? getValue()?.toLocaleDateString() : '-')
  }),
  

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const api = row.original
      return ( api.revokedAt === null ? <RevokeAPIButton id = {api.id} /> : <Button variant={"secondary"}>Revoked</Button>)
    },
  }),
])