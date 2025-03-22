import { Box, Typography, Button, Container } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: "url('/hero-home.png')",
        backgroundSize: "cover",
        backgroundPositionY: "2rem",
        backgroundRepeat: "no-repeat",
        minHeight: { xs: "600px", md: "500px" },
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
        color: "white",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          py: 2,
        }}
      >
        {/* 🧢 Text (hidden on small screens) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              textShadow: "2px 2px 6px rgba(58, 3, 83, 0.6)",
              color: "white",
            }}
          >
            KING'D UP
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 1,
              textShadow: "2px 2px 4px rgba(58, 3, 83,0.4)",
              fontSize: { xs: "1.25rem", md: "1.7rem" },
            }}
          >
            Main Character Energy. Every Fit.
          </Typography>
        </Box>

        {/* 🛍️ Buttons — still show even on small */}
        <Box
          sx={{
            position: "absolute",
            bottom: 24,
            left: 24,
            zIndex: 2,
          }}
        >
          <Button variant="contained" color="warning" size="large">
            Shop the Drop
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
