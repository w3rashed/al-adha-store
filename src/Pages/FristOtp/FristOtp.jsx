import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const FristOtp = () => {
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    // Retrieve phone selection data from local storage
    const storedData = localStorage.getItem("phoneSelectionData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Set the mobile number if it exists in the object
      if (parsedData.mobile) {
        setMobileNumber(parsedData.mobile);
      }
    }
  }, []);
  console.log(mobileNumber);

  const handleComplete = () => {
    // Enable resend OTP button when timer finishes
    setIsResendEnabled(true);
  };

  const handleResendOtp = () => {
    // Logic to resend the OTP
    console.log("OTP Resent");
    setIsResendEnabled(false); // Disable the button again after resending
  };

  return (
    <div>
      <h2 className="text-center text-4xl font-bold text-gray-700">
        Number Verification
      </h2>

      {/* Countdown Timer */}
      <div className="flex justify-center my-5">
        <CountdownCircleTimer
          isPlaying
          duration={180} // You can set this to a higher value for the OTP process
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[180, 120, 60, 0]}
          onComplete={handleComplete} // This triggers when the timer finishes
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            // Pad seconds with leading zero if necessary
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            return `${minutes}:${formattedSeconds}`;
          }}
        </CountdownCircleTimer>
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
    </div>
  );
};

export default FristOtp;
