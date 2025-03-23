import { useState } from "react";
import { CardActionArea, useMediaQuery } from "@mui/material";
import {
  Modal,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";

import ProductCard from "../ProductCard";
import MobileProductCard from "../MobileProductCard";

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
  Size?: string;
  Color?: string;
  AvailabilityStatus?: string;
  RetailPrice?: string;
  Variants?: Variant[];
  // ...other fields
}

interface Props {
  products: Product[];
}

export default function ProductDisplay({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductMainImage, setSelectedProductMainImage] = useState("");
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedProductMainImage(product.ThumbnailURL);
  };
  const handleClose = () => setSelectedProduct(null);

  console.log("products", products);

  return (
    <Grid container spacing={2}>
      {/* Product List */}
      <Grid item xs={12} md={selectedProduct ? 6 : 12}>
        <Grid container spacing={2}>
          {products?.map((product) => {
            console.log("product", product);

            const retailPrice = product.Variants
              ? product.Variants[0]?.RetailPrice
              : "N/A";
            return (
              <Grid item xs={6} md={6} key={product.ID}>
                <Card onClick={() => handleSelect(product)}>
                  <CardContent
                    sx={{
                      minHeight: "200px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={product.ThumbnailURL}
                      alt={product.Name}
                      width="100%"
                    />
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.Name}
                    </Typography>
                    <Typography>{retailPrice}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      {/* Side Panel for Desktop */}
      <AnimatePresence>
        {!isMobile && selectedProduct && (
          <Grid item md={6} style={{ height: "100vh" }}>
            <motion.div
              key="desktop-product-panel"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent sx={{ position: "relative" }}>
                  <IconButton
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                    }}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <CardActionArea>
                    <ProductCard
                      product={selectedProduct}
                      selectedProductMainImage={selectedProductMainImage}
                    />
                  </CardActionArea>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        )}
      </AnimatePresence>
      {/* Modal for Mobile */}
      {isMobile && (
        <Modal open={!!selectedProduct} onClose={handleClose}>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ outline: "none" }}
          >
            <Card
              sx={{
                maxWidth: 400,
                margin: "auto",
                mt: 10,
                p: 2,
                position: "relative",
              }}
            >
              {selectedProduct && (
                <CardContent sx={{ position: "relative" }}>
                  <CardActionArea>
                    <MobileProductCard
                      product={selectedProduct}
                      onClose={handleClose}
                    />
                  </CardActionArea>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </Modal>
      )}
    </Grid>
  );
}
