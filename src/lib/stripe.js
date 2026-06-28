import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    user_premium: 'price_1TnGAcPZY2ZwPB1lUYoC0r5y',
    user_pro: 'price_1TnGgRPZY2ZwPB1lm63KECZw'
}