// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser, fetchCurrentUser } from "@/lib/api/user";
import { useUserStore } from "@/store/userStore";
import { Button, TextField, Typography, Container, Alert } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { token } = await loginUser(form.email, form.password);

      localStorage.setItem("token", token);

      const user = await fetchCurrentUser(token);
      useUserStore.getState().setUser(user);

      router.push("/");
    } catch (err: unknown) {
      console.error(err);
      // setError(err.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Container>
  );
}
