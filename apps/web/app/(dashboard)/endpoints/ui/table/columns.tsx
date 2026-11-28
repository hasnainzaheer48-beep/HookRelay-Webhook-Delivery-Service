"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "../../../../../components/ui/data-table-features"
import { ColumnActions } from "../column-actions"
import { DeleteEndpointButton } from "../delete-endpoint-button"


export interface Endpoint {
  id: string;
  url: string;
  status: "active" | "paused" | "disabled"
  rateLimitPerSec: number;
  createdAt: Date; 
  description: string | null;
  eventTypes: string[];
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

      
      return (
            <div>
       

      <ColumnActions {...endpoint} />
        <DeleteEndpointButton  id = {endpoint.id} />
   
</div>
      )
    },
  }),
])