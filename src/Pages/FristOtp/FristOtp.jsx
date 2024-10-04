import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useOrderData from "../../Hooks/useOrderData";

const FristOtp = () => {
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [inputOtp, setInputOtp] = useState("");
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Use the custom hook to get order data
  const { orderData, mobileNumber, refetch } = useOrderData();

  useEffect(() => {
    if (mobileNumber) {
      refetch();
    }
  }, [mobileNumber, refetch]);

  const handleComplete = () => {
    setIsResendEnabled(true);
  };

  const handleResendOtp = () => {
    console.log("OTP Resent");
    setIsResendEnabled(false);
  };

  const handleOtpChange = (e) => {
    setInputOtp(e.target.value);
    setErrorMessage("");
  };

  const handleVerifyOtp = () => {
    if (parseInt(inputOtp) === orderData.otp1) {
      setIsOtpCorrect(true);
      setErrorMessage("");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your OTP has been verified",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/userdetails"); // Redirect to user details page
      });
    } else {
      setErrorMessage("Incorrect OTP. Please try again.");
      setIsOtpCorrect(false);
    }
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-gray-700">
        Number Verification
      </h2>

      {/* Countdown Timer */}
      <div className="flex justify-center my-5">
        <div className="relative">
          <CountdownCircleTimer
            isPlaying
            duration={180}
            colors={["#14B8A9"]}
            colorsTime={[180]}
            onComplete={handleComplete}
            size={150} // Base size
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
        <div className="absolute top-0 left-0 w-38 h-38 md:w-48 md:h-48">
          <CountdownCircleTimer
            isPlaying
            duration={180}
            colors={["#14B8A9"]}
            colorsTime={[180]}
            onComplete={handleComplete}
            size={150} // Base size
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
      </div>

      {/* OTP Input Field */}
      <div className="my-5 mx-3">
        <TextField
          
          id="otp-input"
          label="Enter Your OTP"
          type="text"
          variant="standard"
          fullWidth
          required
          value={inputOtp}
          onChange={handleOtpChange}
        />
      </div>

      {/* Resend OTP Button */}
      {isResendEnabled && (
        <div className="flex justify-center my-3">
          <button
            onClick={handleResendOtp}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Resend OTP
          </button>
        </div>
      )}

      {/* Verify OTP Button */}
      {!isOtpCorrect && (
        <div className="flex justify-center my-3">
          <button
            onClick={handleVerifyOtp}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-center my-3">{errorMessage}</div>
      )}

      {/* Display Order Data */}
      {orderData.length > 0 && (
        <div className="mt-5">
          <h3 className="text-lg font-semibold">Your Orders:</h3>
          <ul>
            {orderData.map((order) => (
              <li key={order.id}>{order.details}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FristOtp;
