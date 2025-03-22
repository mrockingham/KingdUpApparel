import { useEffect, useState } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import ProductCard from "@/components/ProductCard";

type Variant = {
  ID: number;
  Name: string;
  RetailPrice: string;
  ThumbnailURL: string;
};

type Product = {
  ID: number;
  Name: string;
  ThumbnailURL: string;
  Variants: Variant[];
};

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  console.log("products", products);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Kingdup Collection
      </Typography>

      {!products ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.ID}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
