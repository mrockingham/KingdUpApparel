import { useEffect } from "react";
import { Box, Grid, Typography, Select, MenuItem, Button } from "@mui/material";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
type Variant = {
  ID: number;
  Name: string;
  RetailPrice: string;
  ThumbnailURL: string;
  Size: string;
  Color: string;
};

type Product = {
  ID: number;
  Name: string;
  ThumbnailURL: string;
  RetailPrice?: string;
  Variants?: Variant[];
};

interface ProductCardProps {
  product: Product;
  selectedProductMainImage: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstVariant =
    product.Variants && product.Variants.find((v) => v.Size === "S");
  const [mainImage, setMainImage] = useState<string>(
    firstVariant?.ThumbnailURL || product.ThumbnailURL
  );
  useEffect(() => {
    const defaultImg =
      product.Variants?.[0]?.ThumbnailURL || product.ThumbnailURL;
    setMainImage(defaultImg);
  }, [product]);
  const [selectedColor, setSelectedColor] = useState<string>(
    firstVariant?.Color || ""
  );

  const filteredVariants = useMemo(
    () => product.Variants?.filter((v) => v.Color === selectedColor) || [],
    [product.Variants, selectedColor]
  );

  const [selectedVariantId, setSelectedVariantId] = useState<number>(
    filteredVariants[0]?.ID || firstVariant?.ID || 0
  );

  const uniqueColors = [
    ...new Set(product.Variants?.map((v) => v.Color) || []),
  ];

  const addToCart = () => {
    const selectedVariant = product.Variants?.find(
      (v) => v.ID === selectedVariantId
    );

    useCartStore.getState().addItem({
      ID: selectedVariant?.ID || product.ID,
      Name: product.Name,
      RetailPrice: selectedVariant?.RetailPrice || product.RetailPrice || "",
      ThumbnailURL: mainImage,
      Size: selectedVariant?.Size || "",
      Color: selectedVariant?.Color || "",
      Quantity: 1,
    });

    console.log("✅ Added to cart:", product.Name);
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Left: Image and thumbnails */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={mainImage}
            alt={product.Name}
            sx={{ width: "100%", borderRadius: 2 }}
          />

          <Box display="flex" mt={2}>
            <img
              src={product.ThumbnailURL}
              alt="Product"
              onClick={() => setMainImage(product.ThumbnailURL)}
              style={{
                width: "60px",
                height: "60px",
                marginRight: "10px",
                border:
                  mainImage === product.ThumbnailURL
                    ? "2px solid #000"
                    : "1px solid #ccc",
                borderRadius: 4,
                cursor: "pointer",
              }}
            />
            {firstVariant?.ThumbnailURL && (
              <img
                src={firstVariant.ThumbnailURL}
                alt="Variant"
                onClick={() => setMainImage(firstVariant.ThumbnailURL)}
                style={{
                  width: "60px",
                  height: "60px",
                  marginRight: "10px",
                  border:
                    mainImage === firstVariant.ThumbnailURL
                      ? "2px solid #000"
                      : "1px solid #ccc",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </Grid>

        {/* Right: Info and controls */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {product.Name}
          </Typography>

          <Typography variant="h6" color="text.secondary" mb={3}>
            ${firstVariant?.RetailPrice}
          </Typography>

          {/* Color selector */}
          <Box display="flex" gap={1} mb={2}>
            {uniqueColors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedColor(color);
                  const firstSizeInColor = product.Variants?.find(
                    (v) => v.Color === color
                  );
                  if (firstSizeInColor) {
                    setSelectedVariantId(firstSizeInColor.ID);
                  }
                }}
              >
                {color}
              </Button>
            ))}
          </Box>

          {/* Size dropdown */}
          <Select
            fullWidth
            value={selectedVariantId}
            onChange={(e) => {
              setSelectedVariantId(Number(e.target.value));
            }}
          >
            {filteredVariants.map((variant) => (
              <MenuItem key={variant.ID} value={variant.ID}>
                {variant.Size}
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
