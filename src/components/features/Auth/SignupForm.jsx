import React from "react";
import { TextField } from "../../controls";
import { specializationOptions } from "../../../utils/constant";
import { useState } from "react";
import { Email, Lock, Person } from '@mui/icons-material';
import { Autocomplete } from "@mui/material";
import {Button, Typography, Link} from "@mui/material";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSpecializationChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, specialization: newValue }));
    setErrors((prev) => ({ ...prev, specialization: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.specialization)
      newErrors.specialization = "Specialization is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;

    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      alert("Signup successful!");
    }, 1500);
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
      {errors.name && (
        <Typography variant="caption" color="error">
          {errors.name}
        </Typography>
      )}

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
      {errors.email && (
        <Typography variant="caption" color="error">
          {errors.email}
        </Typography>
      )}

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
      {errors.password && (
        <Typography variant="caption" color="error">
          {errors.password}
        </Typography>
      )}

      <Autocomplete
        options={specializationOptions}
        getOptionLabel={(option) => option.label}
        value={
          specializationOptions.find(
            (opt) => opt.value === formData.specialization
          ) || null
        }
        onChange={(event, newValue) => {
          handleSpecializationChange(event, newValue ? newValue.value : "");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Specialization"
            placeholder="Select your specialization"
            error={Boolean(errors.specialization)}
            helperText={errors.specialization}
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        disabled={loading}
        sx={{ py: 1.2, fontWeight: 600 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
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
