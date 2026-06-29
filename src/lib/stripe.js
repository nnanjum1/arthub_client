import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    user_premium: 'price_1TnfNiPZY2ZwPB1laP9r8iT1',
    user_pro: 'price_1TnfN6PZY2ZwPB1l1WzPp9oS'
}