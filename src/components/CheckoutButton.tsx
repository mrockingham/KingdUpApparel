// components/CheckoutButton.tsx
import { Button } from "@mui/material";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";

export default function CheckoutButton() {
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
            user_id: user ? user.id : null,
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
