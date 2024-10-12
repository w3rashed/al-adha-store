import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2"; // Import SweetAlert
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

const UpdatePass = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(false);
  };

  // Update Password Method
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please make sure both passwords are identical.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  
    try {
      const response = await axiosPublic.patch("/update-password", { password });
      console.log(response.data);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Password successfully sent to the server!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard")
  
    } catch (error) {
      // Handle any errors from the backend
      Swal.fire({
        icon: "error",
        title: "Failed to send password",
        text: error.response?.data?.message || "Please try again.",
      });
    }
  };
  

  return (
    <div className="">
      <div className="mt-5 ml-5">
        <BurgerMenu></BurgerMenu>
      </div>
      <div className="max-w-lg mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl lg:mt-16 my-5">
          Update Password
        </h2>

        <div className="border rounded-lg shadow-md mb-10 lg:p-10 p-6">
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-5">
              <FormControl sx={{ width: "100%" }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
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

            <div className="mb-5">
              <FormControl sx={{ width: "100%" }} variant="standard">
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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

            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#14B8A9",
                width: "100%",
                padding: "12px 0",
              }}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePass;
