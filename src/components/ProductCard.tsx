import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import Link from "next/link";

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

  return (
    <Link href={`/product/${product.ID}`} passHref>
      <Card>
        <CardActionArea>
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
        </CardActionArea>
      </Card>
    </Link>
  );
}
