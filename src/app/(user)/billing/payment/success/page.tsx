import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { createSubscription } from '@/app/actions/userSubscription'; 
import { auth } from '@/auth'; 
import { getUserSubscriptionId } from '@/app/actions/userSubscription'; 
import { redirect } from 'next/navigation';
import { getUser } from '@/auth/server';

const SuccessPage = async () => {
    try {
        // Fetch session and user data
        const session = await auth();
        const regsession = await getUser();

        const userId = session?.user?.id;
        const regUserId = regsession?.id;

        // Extract stripeCustomerID from session or regsession
        const stripeCustomerID = await getUserSubscriptionId({
            userId,
            regUserId
        });

        // Check if stripeCustomerID is defined and is a string
        if (typeof stripeCustomerID === 'string') {
            await createSubscription({ stripeCustomerID });
        } else {
            console.warn("No valid stripeCustomerID found.");
        }

        // Optionally, redirect after successful operation
        redirect('/dashboard');
    } catch (error) {
        console.error("Error in SuccessPage:", error);
        // Handle error appropriately
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Alert variant="default">
                <AlertTitle className="mb-3 text-xl text-green-400">Success</AlertTitle>
                <AlertDescription>
                    Your account has been upgraded.
                    <br />
                    <Link href="/dashboard" className="underline">Go to dashboard </Link> 
                    to generate more quizzes.
                </AlertDescription>
            </Alert>
        </div>
    );
};

export default SuccessPage;
