// pages/order/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  //   CircularProgress,
  Alert,
  Container,
} from "@mui/material";

interface OrderItem {
  id: number;
  product_name: string;
  size?: string;
  color?: string;
  quantity: number;
  price_each: number;
  total_price: number;
}

interface Order {
  id: number;
  status: string;
  total: number;
  created_at: string;
  items: OrderItem[];
}

export default function OrderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  //   const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return; // wait for the router

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch order");
        }

        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order");
      }
    };

    fetchOrder();
  }, [id]);

  //   if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Order Confirmation
      </Typography>
      <Typography variant="body1">Order ID: {order?.id}</Typography>
      <Typography variant="body1">Status: {order?.status}</Typography>
      <Typography variant="body1">Total: ${order?.total.toFixed(2)}</Typography>

      <Box mt={3}>
        {order?.items.map((item) => (
          <Box key={item.id} mb={2}>
            <Typography>
              {item.product_name} ({item.quantity}) — $
              {item.total_price.toFixed(2)}
            </Typography>
            {item.size && (
              <Typography variant="caption">Size: {item.size}</Typography>
            )}
            {item.color && (
              <Typography variant="caption">Color: {item.color}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
}
