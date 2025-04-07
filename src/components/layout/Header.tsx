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
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const navItems = ["Shop", "About", "Contact"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

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
        {user ? (
          <>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Welcome, {user.Name}
            </Typography>
            <Button
              onClick={() => logout()}
              color="error"
              sx={{ mt: 1 }}
              fullWidth
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} href="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} href="/register" color="inherit">
              Register
            </Button>
          </>
          //   <Link href="/login" passHref>
          //     <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
          //       Login
          //     </Button>
          //   </Link>
        )}
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

          {/* Desktop Nav */}
          {!isMobile && (
            <Box display="flex" gap={2} alignItems="center">
              {navItems.map((item) => (
                <Button key={item} color="inherit">
                  {item}
                </Button>
              ))}
              {user ? (
                <>
                  <Typography fontSize="0.9rem">Hi, {user.Name}</Typography>
                  <Button onClick={() => logout()} color="error">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button component={Link} href="/login" color="inherit">
                    Login
                  </Button>
                  <Button component={Link} href="/register" color="inherit">
                    Register
                  </Button>
                </>
              )}
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
