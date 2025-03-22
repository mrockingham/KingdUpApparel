import { Card, CardMedia, CardContent, Typography } from "@mui/material";

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

export default function ProductCard({ product }: { product: Product }) {
  const firstVariant = product.Variants?.[0];

  console.log("product", product);

  return (
    <Card>
      <CardMedia
        component="img"
        height="240"
        image={product.ThumbnailURL || firstVariant?.ThumbnailURL}
        alt={product.Name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.Name}
        </Typography>
        {firstVariant && (
          <Typography color="text.secondary">
            From ${firstVariant.RetailPrice}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
