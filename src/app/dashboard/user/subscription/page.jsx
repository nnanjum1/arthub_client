"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    FaCheckCircle,
    FaCrown,
    FaGem,
} from "react-icons/fa";

const Subscription = () => {
    const { data: session } = authClient.useSession();

    const user = session?.user;

    const [currentPlan, setCurrentPlan] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!user?.email) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`
                );

                const data = await res.json();

                setCurrentPlan(data.subscriptionTier || "Free");
            } catch (error) {
                console.error(error);
                toast.error("Failed to load subscription.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    const handleUpgrade = async (plan) => {
        try {
            setUpdating(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/subscription/${user.email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        subscriptionTier: plan,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setCurrentPlan(plan);

            toast.success(`Subscription upgraded to ${plan}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update subscription");
        } finally {
            setUpdating(false);
        }
    };

    const plans = [
        {
            name: "Free",
            price: "$0",
            purchases: "3 Paintings",
            color: "border-slate-300",
            icon: (
                <FaCheckCircle className="text-3xl text-slate-500" />
            ),
            features: [
                "Browse all artworks",
                "Purchase up to 3 artworks",
                "Basic profile",
                "Community access",
            ],
        },
        {
            name: "Pro",
            price: "$9.99",
            purchases: "9 Paintings",
            color: "border-blue-500",
            icon: (
                <FaCrown className="text-3xl text-blue-600" />
            ),
            features: [
                "Purchase up to 9 artworks",
                "Priority support",
                "Exclusive collections",
                "Early access to new art",
            ],
        },
        {
            name: "Premium",
            price: "$19.99",
            purchases: "Unlimited",
            color: "border-yellow-500",
            icon: (
                <FaGem className="text-3xl text-yellow-500" />
            ),
            features: [
                "Unlimited purchases",
                "Premium support",
                "Exclusive premium collections",
                "VIP member badge",
                "Early access to limited editions",
            ],
        },
    ];

    if (loading) {
        return (
            <div className="text-center py-20">
                Loading subscription...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">

            <div className="mb-10">
                <h1 className="text-3xl font-bold">
                    Subscription Plans
                </h1>

                <p className="text-slate-500 mt-2">
                    Choose a plan that fits your artwork collection needs.
                </p>
            </div>

            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-blue-700">
                    Current Plan
                </h2>

                <p className="mt-2">
                    You are currently using the{" "}
                    <span className="font-bold text-blue-700">
                        {currentPlan}
                    </span>{" "}
                    plan.
                </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`bg-white border-2 ${plan.color} rounded-2xl shadow-sm p-8 flex flex-col`}
                    >
                        <div className="flex justify-center mb-5">
                            {plan.icon}
                        </div>

                        <h2 className="text-2xl font-bold text-center">
                            {plan.name}
                        </h2>

                        <p className="text-center text-4xl font-bold text-blue-600 mt-4">
                            {plan.price}
                        </p>

                        <p className="text-center text-slate-500 mt-2">
                            {plan.purchases}
                        </p>

                        <div className="mt-8 space-y-3 flex-grow">
                            {plan.features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3"
                                >
                                    <FaCheckCircle className="text-green-500" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            disabled={
                                currentPlan === plan.name ||
                                updating
                            }
                            onClick={() =>
                                handleUpgrade(plan.name)
                            }
                            className={`mt-8 w-full py-3 rounded-lg font-semibold transition ${currentPlan === plan.name
                                ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {currentPlan === plan.name
                                ? "Current Plan"
                                : updating
                                    ? "Updating..."
                                    : `Upgrade to ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-white border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                    Plan Benefits
                </h2>

                <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li>Upgrade or downgrade your subscription anytime.</li>
                    <li>Your purchased artworks remain accessible even if your plan changes.</li>
                    <li>Payments are billed securely.</li>
                    <li>Premium members receive exclusive artwork access.</li>
                </ul>
            </div>

        </div>
    );
};

export default Subscription;