import { redirect } from "next/navigation";
import { stripe } from "../../../../../lib/stripe";

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error("Invalid session.");
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status === "open") {
        redirect("/");
    }

    if (session.status === "complete") {

        const email = session.customer_email;

        const plan = session.metadata.plan;

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/subscription/${email}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subscriptionTier:
                        plan === "user_pro"
                            ? "pro"
                            : "premium",
                }),
            }
        );

        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-600">
                        Payment Successful
                    </h1>

                    <p className="mt-4">
                        Your subscription has been activated.
                    </p>
                </div>
            </div>
        );
    }
}