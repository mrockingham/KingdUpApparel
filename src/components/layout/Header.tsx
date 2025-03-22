import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const navItems = ["Shop", "About", "Contact"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {`KING'D UP`}
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", paddingY: "5px" }}>
          <img
            src="/kingduptransparent.png"
            alt="Logo"
            style={{ width: "70px", height: "70px" }}
          />
          {/* <Typography variant="h6" fontWeight="bold">
            {`KING'D UP`}
          </Typography> */}

          {/* Desktop Nav */}
          {!isMobile && (
            <Box display="flex" gap={2}>
              {navItems.map((item) => (
                <Button key={item} color="inherit">
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
