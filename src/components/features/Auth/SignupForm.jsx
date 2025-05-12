import React from "react";
import { TextField } from "../../controls";
import { specializationOptions, USER_ROLES } from "../../../utils/constant";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  CircularProgress,
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
    specialty: "",
    role: USER_ROLES.PATIENT,
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
      !formData.role
    )
      return ToastRef.showSnackbar("Required Fields are missing", "error");

    if (formData.role == USER_ROLES.DOCTOR && !formData.specialty) {
      return ToastRef.showSnackbar("Specialty is required", "error");
    }

    if(formData.role == USER_ROLES.PATIENT ) {
      delete formData.specialty;
    }

    mutate(formData)
  };
  return (
    <>
      <FormControl fullWidth>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Select Role
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <FormControlLabel
            value={USER_ROLES.DOCTOR}
            control={<Radio />}
            label="Doctor"
          />
          <FormControlLabel
            value={USER_ROLES.PATIENT}
            control={<Radio />}
            label="Patient"
          />
        </RadioGroup>
      </FormControl>

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

      {formData.role == USER_ROLES.DOCTOR && (
        <FormControl fullWidth>
          <InputLabel id="specialty-label">Specialty</InputLabel>
          <Select
            labelId="specialty-label"
            value={formData.specialty || ""}
            label="Specialty"
            name="specialty"
            onChange={handleChange}
          >
            {specializationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

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
