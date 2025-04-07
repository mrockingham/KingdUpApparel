import { Typography, Container, Button } from "@mui/material";
import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        ❌ Checkout canceled
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        You can continue shopping and come back to checkout anytime.
      </Typography>
      <Button variant="outlined" component={Link} href="/" color="primary">
        Back to Shop
      </Button>
    </Container>
  );
}
