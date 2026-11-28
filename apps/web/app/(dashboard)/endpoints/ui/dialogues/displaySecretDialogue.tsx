import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import getSession from "@/lib/session";
import { prisma } from "@hookrelay/shared";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { CopyButton } from "../copyButton";

export async function DisplaySecretDialogue({id} : {id: string})
{
    const session = await getSession()
    if(!session?.user)
    {
        throw new Error("Unauthorized")
    }

    const result = await prisma.endpoint.findFirst({
        where: {
            id,
            userId: session.user.id
        },
        select: {
            secret: true
        }
    })

    if(!result?.secret)
    {
        notFound()
    }
    const {secret} = result


    return(
    <Dialog >
    <DialogTrigger asChild>
        <Button variant={"outline"}>
    Show Secret
        </Button>
    </DialogTrigger>

   <DialogContent>
    <DialogHeader>
      <DialogTitle>Show Secret</DialogTitle>
      <DialogDescription>
        Show the endpoint secret
      </DialogDescription>
    </DialogHeader>
          <code className="block break-all rounded bg-muted p-2 text-sm">
                {secret ?? "whsec_••••••••••••••••"}
            </code>
           <CopyButton prompt="Copy Secret" textToCopy={secret} />
  </DialogContent>
</Dialog>
    )
}