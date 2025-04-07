import { Box, Typography, Container, Button } from "@mui/material";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        🎉 Thank you for your order!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Your payment was successful. We'll send you an email with the details.
      </Typography>
      <Button variant="contained" component={Link} href="/" color="primary">
        Continue Shopping
      </Button>
    </Container>
  );
}
