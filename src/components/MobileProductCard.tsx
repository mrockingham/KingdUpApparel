import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCartStore } from "@/components/store/cartStore";

// Types
interface Variant {
  ID: number;
  Name: string;
  RetailPrice: string;
  ThumbnailURL: string;
  Size: string;
  Color: string;
}

interface Product {
  ID: number;
  Name: string;
  ThumbnailURL: string;
  RetailPrice?: string;
  Variants?: Variant[];
}

interface MobileProductCardProps {
  product: Product;
  onClose: () => void;
}

export default function MobileProductCard({
  product,
  onClose,
}: MobileProductCardProps) {
  const firstVariant =
    product.Variants?.find((v) => v.Size === "S") || product.Variants?.[0];

  const [mainImage, setMainImage] = useState<string>(
    firstVariant?.ThumbnailURL || product.ThumbnailURL
  );
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

  const uniqueColors = useMemo(
    () => [...new Set(product.Variants?.map((v) => v.Color) || [])],
    [product.Variants]
  );

  useEffect(() => {
    const defaultImg =
      product.Variants?.[0]?.ThumbnailURL || product.ThumbnailURL;
    setMainImage(defaultImg);
  }, [product]);

  const addToCart = () => {
    const selectedVariant = product.Variants?.find(
      (v) => v.ID === selectedVariantId
    );

    useCartStore.getState().addItem({
      ID: selectedVariant?.ID || product.ID,
      Name: product.Name,
      RetailPrice: selectedVariant?.RetailPrice || product.RetailPrice || "",
      Size: selectedVariant?.Size || "",
      Color: selectedVariant?.Color || "",
      ThumbnailURL: mainImage,
      Quantity: 1,
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        overflowY: "auto",
        maxHeight: "90vh",
        position: "relative",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        component="img"
        src={mainImage}
        alt={product.Name}
        sx={{ width: "100%", borderRadius: 2, mb: 2 }}
      />

      <Box display="flex" gap={1} mb={2} justifyContent="center">
        <img
          src={product.ThumbnailURL}
          alt="Default"
          onClick={() => setMainImage(product.ThumbnailURL)}
          style={{ width: 50, height: 50, borderRadius: 4, cursor: "pointer" }}
        />
        {firstVariant?.ThumbnailURL && (
          <img
            src={firstVariant.ThumbnailURL}
            alt="Variant"
            onClick={() => setMainImage(firstVariant.ThumbnailURL)}
            style={{
              width: 50,
              height: 50,
              borderRadius: 4,
              cursor: "pointer",
            }}
          />
        )}
      </Box>

      <Typography variant="h6" fontWeight={600} mb={1}>
        {product.Name}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        ${firstVariant?.RetailPrice}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        {uniqueColors.map((color) => (
          <Button
            key={color}
            variant={selectedColor === color ? "contained" : "outlined"}
            size="small"
            onClick={() => {
              setSelectedColor(color);
              const firstSize = product.Variants?.find(
                (v) => v.Color === color
              );
              if (firstSize) setSelectedVariantId(firstSize.ID);
            }}
          >
            {color}
          </Button>
        ))}
      </Box>

      <Select
        fullWidth
        size="small"
        value={selectedVariantId}
        onChange={(e) => setSelectedVariantId(Number(e.target.value))}
        sx={{ mb: 3 }}
      >
        {filteredVariants.map((variant) => (
          <MenuItem key={variant.ID} value={variant.ID}>
            {variant.Size}
          </MenuItem>
        ))}
      </Select>

      <Button
        fullWidth
        variant="contained"
        color="warning"
        onClick={addToCart}
        sx={{ py: 1.5, fontWeight: 600 }}
      >
        Add to Cart
      </Button>
    </Box>
  );
}
