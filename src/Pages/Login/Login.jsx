import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(emailValue));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  // Login Method
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");

    // Validate form fields
    if (!email || emailError) {
      setEmailError(true);
      setLoginError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setPasswordError(true);
      setLoginError("Please enter your password.");
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Extract the token from the response
      const token = response.data.token;

      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem("token", token);

      // If login is successful, redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl lg:mt-16 my-5">
        Admin Login
      </h2>

      <div className="border rounded-lg shadow-md mb-10 lg:p-10 p-6">
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <TextField
              id="standard-basic"
              label="Admin Email"
              variant="standard"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : ""
              }
              fullWidth
              required
            />
          </div>

          <div className="mb-5">
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
              />
            </FormControl>
          </div>

          {loginError && (
            <p className="text-red-500 text-sm text-center mb-4">
              {loginError}
            </p>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "100%", py: 1.5 }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
