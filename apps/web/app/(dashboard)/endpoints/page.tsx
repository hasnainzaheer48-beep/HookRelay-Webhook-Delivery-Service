import SignOutButton from "@/components/sign-out-button";

export default async function Page()
{
   

     return(
            <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8  ">
    
            <div className="space-y-8 ">
                <h1 className="text-3xl font-bold ">Profile</h1>
            </div>
            <SignOutButton />
            <pre className="text-sm overflow-clip ">   
            </pre>
            </div>
        )
}