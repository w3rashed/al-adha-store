import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import useOrderData from "../../Hooks/useOrderData";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ThirdOtp = () => {
  // State for OTP input and error message
  const [otp, setOtp] = useState("");
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { orderData, lastOrder, refetch } = useOrderData();

  const axiosPublic = useAxiosPublic();
  const id = lastOrder?._id;
  const navigate = useNavigate();

  // Set up a refetch interval
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);


  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value;

    // Allow only digits and limit to 4 characters
    if (/^\d{0,8}$/.test(value)) {
      setOtp(value);

      // Check if the OTP has 4 digits
      if (value.length > 3) {
        setIsOtpCorrect(true); // Show Verify OTP button
      } else {
        setIsOtpCorrect(false); // Hide Verify OTP button
      }
    }
  };

  console.log(orderData);

  // Handle OTP verification (log the OTP value to the console)
  const handleVerifyOtp = () => {
    console.log("Entered OTP:", otp);
    axiosPublic
      .patch(`order-update/${id}`, { otp3: otp })
      .then((response) => {
        console.log("OTP3 updated successfully:", response.data);
        Swal.fire({
          position: "top",
          icon: "success",
          title:
            "Successfully completed your order. Please wait for admin confirmation!",
        });
      })
      .then(navigate("/orderedStatus"))
      .catch((error) => {
        console.error("Error updating OTP:", error);
        setErrorMessage("Failed to update OTP. Please try again.");
      });
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-gray-700 my-5">
        Third OTP Verification
      </h2>

      {/* Countdown Timer */}
      <div className="flex justify-center my-5">
        <CountdownCircleTimer
          isPlaying
          duration={180}
          colors={["#14B8A9"]}
          colorsTime={[180]}
          size={150}
          strokeWidth={6}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            return (
              <div className="text-2xl sm:text-3xl md:text-4xl">
                {`${minutes}:${formattedSeconds}`}
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>

      {/* OTP Input Field */}
      <div className="flex justify-center my-5 mx-3">
        <div className="w-1/2">
          <TextField
            className="text-2xl"
            id="otp-input"
            label="Enter Your OTP"
            type="tel"
            variant="standard"
            fullWidth
            required
            value={otp}
            onChange={handleOtpChange}
            inputProps={{ maxLength: 8 }}
          />
        </div>
      </div>

      {/* Verify OTP Button (only visible when 4 digits are entered) */}

      <div className="flex justify-center my-3">
        <button
          onClick={handleVerifyOtp}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Verify OTP
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-center my-3">{errorMessage}</div>
      )}
    </div>
  );
};

export default ThirdOtp;
