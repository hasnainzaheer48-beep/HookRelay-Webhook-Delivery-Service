import { Button } from "@/components/ui/button";

export function RevokeAPIButton({id}: {id: string})
{
    return(
        <Button variant={"destructive"}>Revoke</Button>
    )
}