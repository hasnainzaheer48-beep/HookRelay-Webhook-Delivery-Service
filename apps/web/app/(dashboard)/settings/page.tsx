import { CreateAPISecretDialogue } from "./ui/dialogues/createAPISecretDialogue";

export default async function Page()
{
   

     return(
            <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8  ">
    
            <div className="space-y-8 ">
                <h1 className="text-3xl font-bold ">Settings</h1>
            </div>
           
            <CreateAPISecretDialogue />
            </div>
        )
}