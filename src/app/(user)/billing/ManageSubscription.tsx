"use client";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";



const ManageSubscription = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const redirectToCustomerPortal = async () => {
        
        setLoading(true);

        try {
            const { url } = await fetch('/api/stripe/create-portal' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json());

        
            router.push(url.url);

        } catch (error) {
            setLoading(false);
            console.log('Subscribe Button Error', error)
        }
        
    }
    return (
        <Button className="h-5 rounded-full px-5 py-5" disabled={loading} onClick={redirectToCustomerPortal}>{loading ? 
        <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
        </> :
         "Change Your Subscription"}</Button>
    )
}

export default ManageSubscription;