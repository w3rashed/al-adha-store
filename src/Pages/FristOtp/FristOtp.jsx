import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const FristOtp = () => {
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [inputOtp, setInputOtp] = useState(""); // State for OTP input
  const [isOtpCorrect, setIsOtpCorrect] = useState(false); // State for OTP correctness
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const axiosPublic = useAxiosPublic();

  // Fetch order data based on mobile number
  const { data: orderData = {}, refetch } = useQuery({
    queryKey: ["orderdData", mobileNumber],
    queryFn: async () => {
      if (!mobileNumber) return {};
      const res = await axiosPublic.get(`orderdPhone/${mobileNumber}`);
      return res.data;
    },
    enabled: !!mobileNumber,
  });

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

  useEffect(() => {
    if (mobileNumber) {
      refetch(); // Refetch the order data when mobileNumber changes
    }
  }, [mobileNumber, refetch]);

  const handleComplete = () => {
    // Enable resend OTP button when timer finishes
    setIsResendEnabled(true);
  };

  const handleResendOtp = () => {
    // Logic to resend the OTP
    console.log("OTP Resent");
    setIsResendEnabled(false); // Disable the button again after resending
  };

  const handleOtpChange = (e) => {
    setInputOtp(e.target.value); // Update input value
    setErrorMessage(""); // Clear error message
  };

  const handleVerifyOtp = () => {
    if (parseInt(inputOtp) === orderData.otp1) {
      setIsOtpCorrect(true);
      setErrorMessage(""); // Clear any previous error message
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
          value={inputOtp}
          onChange={handleOtpChange} // Handle input change
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

      {/* Display Next Button if OTP is correct */}
      {isOtpCorrect && (
        <div className="flex justify-center my-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            // Add navigation to the next step here
          >
            Next
          </button>
        </div>
      )}

      {/* Display Order Data */}
      {orderData.length > 0 && (
        <div className="mt-5">
          <h3 className="text-lg font-semibold">Your Orders:</h3>
          <ul>
            {orderData.map((order) => (
              <li key={order.id}>{order.details}</li> // Adjust according to your order data structure
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FristOtp;
