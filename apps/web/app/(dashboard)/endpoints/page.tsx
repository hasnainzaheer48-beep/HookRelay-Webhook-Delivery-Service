import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Form from "./ui/createForm";
import { Button } from "@/components/ui/button";

export default async function Page()
{
   

     return(
            <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8  ">
    
            <div className="space-y-8 ">
                <h1 className="text-3xl font-bold ">Endpoints</h1>
            </div>

            <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"lg"}>    
                Create Endpoint
                </Button>
                </DialogTrigger>
            <DialogContent>
            <DialogHeader>
            <DialogTitle>Create a new Endpoint</DialogTitle>
            <DialogDescription>
                    Register a new Endpoint.
            </DialogDescription>
            </DialogHeader>
            <Form />
            </DialogContent>
            </Dialog>






            <pre className="text-sm overflow-clip ">   
            </pre>
            </div>
        )
}