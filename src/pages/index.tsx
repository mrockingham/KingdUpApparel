import { useEffect, useState } from "react";

import { Container, Typography, CircularProgress, Box } from "@mui/material";

import HeroSection from "@/components/HeroSection";
import ProductDisplay from "@/components/products/ProductDisplay";
import CartFab from "@/components/cart/CartFab";
import CartDrawer from "@/components/cart/CartDrawer";

// type Variant = {
//   ID: number;
//   Name: string;
//   RetailPrice: string;
//   ThumbnailURL: string;
// };

type Product = {
  ID: number;
  Name: string;
  ThumbnailURL: string;
  Size?: string;
  Color?: string;
  AvailabilityStatus?: string;
  RetailPrice?: string;
  // ...other fields
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  return (
    <Box>
      <HeroSection />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Kingdup Collection
        </Typography>

        {!products ? (
          <CircularProgress />
        ) : (
          <ProductDisplay products={products} />
        )}
      </Container>
      <>
        {/* Floating Button */}
        <CartFab onClick={() => setDrawerOpen(true)} />

        {/* Drawer */}
        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </>
    </Box>
  );
}
