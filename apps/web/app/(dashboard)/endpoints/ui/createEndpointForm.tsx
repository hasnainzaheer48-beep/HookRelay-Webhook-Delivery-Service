import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEndpoint } from "../actions";

export default function CreateEndpointForm()
{
    return(
            <form action={createEndpoint} className="max-w-sm w-full space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="url">URL </Label> 
                    <Input  type="text" id="url" name="url" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="description">Description </Label> 
                    <Input  type="text" id="description" name="description" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="eventTypes">Event Types </Label> 
                    <Input  type="eventTypes" id="eventTypes" name="eventTypes" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="rateLimitPerSec">Rate Limit Per Second </Label> 
                    <Input  type="number" id="rateLimitPerSec" name="rateLimitPerSec" required />
                    </div>
                    <Button type="submit" className="w-full " > Add Endpoint </Button>
                
        </form>
    )
}