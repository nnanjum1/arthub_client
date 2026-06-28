"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccess() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const savePurchase = async () => {
            try {
                const sessionId = searchParams.get("session_id");

                if (!sessionId) {
                    console.log("No session id");
                    return;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/verify-payment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ sessionId }),
                    }
                );

                const data = await res.json();

                console.log("Verify Payment Response:", data);

                if (!res.ok) {
                    alert(data.message);
                    return;
                }

                router.replace(`/artwork/${data.artworkId}`);
            } catch (err) {
                console.error(err);
            }
        };

        savePurchase();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">
                Verifying payment...
            </h1>
        </div>
    );
}