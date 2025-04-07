// components/CheckoutButton.tsx
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface CheckoutButtonProps {
  cartItems: any[]; // You can make a type for this if needed
}
export default function CheckoutButton({ cartItems }: CheckoutButtonProps) {
  const items = useCartStore((state) => state.items);

  const user = useUserStore((state) => state.user);

  const handleCheckout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              name: item.Name,
              price: parseFloat(item.RetailPrice),
              quantity: item.Quantity,
            })),
            is_guest: user ? false : true,
            user_id: user ? user.ID : null,
            return_url: `${window.location.origin}/checkout-success`,
            cancel_url: `${window.location.origin}/checkout-cancel`,
          }),
        }
      );
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Button
      variant="contained"
      color="warning"
      fullWidth
      onClick={handleCheckout}
    >
      Checkout
    </Button>
  );
}
