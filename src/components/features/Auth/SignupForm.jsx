import React from "react";
import { TextField } from "../../controls";
import { specializationOptions } from "../../../utils/constant";
import { useState } from "react";
import { Email, Lock, Person } from "@mui/icons-material";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useSignup } from "../../../api/auth/useAuthMutations";
import { ToastRef } from "../../controls/Toast";
import { getErrorMessage } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const { mutate, isPending: isLoading } = useSignup({
    onSuccess: () => navigate("/login"),
    onError: (err) => ToastRef.showSnackbar(getErrorMessage(err), "error"),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = () => {
    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.specialization
    )
      return ToastRef.showSnackbar("Required Fields are missing", "error");

    // mutate(formData)
    navigate("/login");
  };
  return (
    <>
      <TextField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        icon={<Person />}
        iconPosition="start"
        placeholder="Enter your name"
      />

      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        icon={<Email />}
        iconPosition="start"
        placeholder="Enter your email"
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        icon={<Lock />}
        iconPosition="start"
        placeholder="Enter your password"
      />

      <FormControl fullWidth>
        <InputLabel id="specialization-label">Specialization</InputLabel>
        <Select
          labelId="specialization-label"
          value={formData.specialization || ""}
          label="Specialization"
          name="specialization"
          onChange={handleChange}
        >
          {specializationOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        disabled={isLoading}
        sx={{ py: 1.2, fontWeight: 600 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
      </Button>

      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Link href="/login" underline="hover">
          Login here
        </Link>
      </Typography>
    </>
  );
}

export default SignupForm;
