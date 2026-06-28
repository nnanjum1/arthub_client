import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe, PLAN_PRICE_ID } from "@/lib/stripe";

export async function POST(request) {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        const formData = await request.formData();

        const plan = formData.get("plan");
        const email = formData.get("email");

        if (!email) {
            return NextResponse.json(
                { message: "Authentication required. Missing user email." },
                { status: 401 }
            );
        }

        const priceId = PLAN_PRICE_ID[plan];

        if (!priceId) {
            return NextResponse.json(
                { message: `Invalid plan selected: ${plan}` },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                email,
                plan,
            },
            success_url: `${origin}/dashboard/user/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard/user/subscription`,
        });

        return NextResponse.redirect(session.url, 303);
    } catch (error) {
        console.error("Stripe Checkout Error:", error);

        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}