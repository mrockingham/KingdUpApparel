// components/CartDrawer.tsx
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCartStore } from "@/store/cartStore";
import { redirectToCheckout } from "@/lib/api/checkout";
import CheckoutButton from "../CheckoutButton";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.RetailPrice || "0");
    return sum + price * item.Quantity;
  }, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />

        {items.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          items.map((item) => (
            <Box key={item.ID} mb={2}>
              <Box display="flex" alignItems="center">
                <img
                  src={item.ThumbnailURL}
                  alt={item.Name}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                />
                <Box ml={2} flex={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {item.Name}
                  </Typography>
                  <Typography variant="body2">${item.RetailPrice}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.ID, item.Quantity - 1)}
                      disabled={item.Quantity === 1}
                    >
                      -
                    </Button>
                    <Typography mx={1}>{item.Quantity}</Typography>
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.ID, item.Quantity + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
                <IconButton onClick={() => removeItem(item.ID)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        )}

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <CheckoutButton />

        {/* <Button
          variant="contained"
          color="warning"
          fullWidth
          sx={{ mt: 2 }}
          disabled={items.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </Button> */}
      </Box>
    </Drawer>
  );
}
