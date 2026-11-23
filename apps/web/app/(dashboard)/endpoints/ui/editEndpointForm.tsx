import { editEndpoint } from "@/actions/endpoint.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EndpointInterface } from "@/interfaces/endpoint.interface";


export default function EditEndpointForm(endpoint : EndpointInterface )
{
    const {id,
        url,
        status,
        rateLimitPerSec,
        createdAt,
        updatedAt ,
        userId,
        description,
        secret,
        eventTypes,
        disabledReason } = endpoint
        const editEndpointWithId = editEndpoint.bind(null, id)
    return(
            <form action={editEndpointWithId} className="max-w-sm w-full space-y-4">
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
                    <Input  type="eventTypes" id="eventTypes" name="eventTypes" defaultValue={eventTypes} required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="rateLimitPerSec">Rate Limit Per Second </Label> 
                    <Input  type="number" id="rateLimitPerSec" name="rateLimitPerSec" defaultValue={rateLimitPerSec} required />
                    </div>
                    <Button type="submit" className="w-full " > Edit Endpoint </Button>    
        </form>
    )
}