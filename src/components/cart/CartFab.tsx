import { Fab, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";

interface CartFabProps {
  onClick: () => void;
}

export default function CartFab({ onClick }: CartFabProps) {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.Quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 600 }}
      animate={{
        opacity: 2,
        y: [600, -15, 8, 0], // higher bounce then settle
        scale: [0.5, 1.2, 0.95, 1],
      }}
      transition={{
        duration: 1.8, // slow down whole animation
        times: [0, 0.4, 0.75, 1], // fine-tune keyframe pacing
        ease: "easeOut",
      }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1200,
      }}
    >
      <Fab color="warning" aria-label="cart" onClick={onClick}>
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
    </motion.div>
  );
}
