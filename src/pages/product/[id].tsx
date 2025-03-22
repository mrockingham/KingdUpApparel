import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCartStore } from "@/components/store/cartStore";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { getProductById } from "@/api/products";
type Variant = {
  ID: number;
  Name: string;
  RetailPrice: string;
  SKU: string;
  ThumbnailURL: string;
};

type Product = {
  ID: number;
  Name: string;
  ThumbnailURL: string;
  Variants: Variant[];
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (!id) return;
    const idString = Array.isArray(id) ? id[0] : id;
    getProductById(idString)
      .then((data) => {
        console.log("data", data);
        setProduct(
          data.find((p: { ID: number }) => p.ID === parseInt(idString))
        );
        setSelectedVariant(data[0].Variants);
      })
      .catch((err) => console.error("Error loading product", err));
  }, [id]);

  console.log("id   ", id);
  console.log("product", product);

  console.log("selectedVariant", selectedVariant);

  if (!product) {
    return (
      <Box p={4}>
        <CircularProgress />
      </Box>
    );
  }

  const addToCart = () => {
    if (!selectedVariant) return;

    useCartStore.getState().addItem({
      variantId: selectedVariant.ID,
      name: selectedVariant.Name,
      price: selectedVariant.RetailPrice,
      previewUrl: selectedVariant.ThumbnailURL,
      quantity: 1,
    });

    console.log("✅ Added to cart:", selectedVariant.Name);
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={selectedVariant?.ThumbnailURL || product.ThumbnailURL}
            alt={product.Name}
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {product.Name}
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            ${selectedVariant?.RetailPrice}
          </Typography>

          <Select
            fullWidth
            value={selectedVariant?.ID || ""}
            onChange={(e) => {
              const variant = product.Variants.find(
                (v) => v.ID === Number(e.target.value)
              );
              if (variant) setSelectedVariant(variant);
            }}
          >
            {product.Variants?.map((variant) => (
              <MenuItem key={variant.ID} value={variant.ID}>
                {variant.Name}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            color="warning"
            size="large"
            sx={{ mt: 4 }}
            onClick={addToCart}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
