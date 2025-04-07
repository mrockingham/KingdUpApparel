import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export async function redirectToCheckout(orderData: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Failed to create checkout session');

  const stripe = await stripePromise;
  await stripe?.redirectToCheckout({ sessionId: data.sessionId });
}
