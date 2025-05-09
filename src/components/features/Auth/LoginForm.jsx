import React from "react";
import { useState } from "react";
import { Button, Typography, Link, CircularProgress } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { TextField, Toast } from "../../controls";
import { useLogin } from "../../../api/auth/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/helper";
import { setUserAuth, setUser } from "../../../redux/Auth/Reducer";
import { useDispatch } from "react-redux";
import { USER_ROLES } from "../../../utils/constant";
import { ToastRef } from "../../controls/Toast";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useLogin({
    onSuccess: (data) => {
      dispatch(setUserAuth(true));
      dispatch(setUser(data));
      navigate("/dashboard");
      localStorage.setItem("@TOKEN");
    },
    onError: (err) => Toast?.showSnackbar(getErrorMessage(err), "error"),
  });

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password)
      return ToastRef.showSnackbar("Required Fields are missing", "error");

    dispatch(setUserAuth(true));
    dispatch(
      setUser({
        name: "Israr Ansari",
        user_type: USER_ROLES.DOCTOR,
        email: "Sample@gmail.com",
      })
    );
    navigate("/dashboard");

    // mutate(formData);
  };

  return (
    <>
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={isLoading}
        sx={{ py: 1.2, fontWeight: 600 }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Continue"
        )}
      </Button>

      <Typography variant="body2" align="center">
        Don’t have an account?{" "}
        <Link href="/signup" underline="hover">
          Sign up from here
        </Link>
      </Typography>
    </>
  );
}

export default LoginForm;
