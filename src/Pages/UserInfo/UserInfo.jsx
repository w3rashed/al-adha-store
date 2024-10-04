import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaArrowRightLong } from "react-icons/fa6";

const UserInfo = () => {
  const [iqama, setIqama] = useState("");
  const [mobile, setMobile] = useState("05");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("phoneSelectionData"));
    if (data) {
      setSavedData(data);
      console.log("Retrieved phone selection data:", data);
    }
  }, []);

  const validateIqama = () =>
    iqama.length === 10 && (iqama[0] === "1" || iqama[0] === "2");

  // Updated mobile validation: must be exactly 10 digits and start with "05"
  const validateMobile = () => mobile.length === 10 && mobile.startsWith("05");

  const validateForm = () => {
    if (!validateIqama()) {
      setError("Iqama number must be 10 digits and start with 1 or 2.");
      return false;
    }
    if (!validateMobile()) {
      setError("Mobile number must be exactly 10 digits and start with '05'.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm() && savedData) {
      const orderDate = new Date().toISOString();
      const orderData = {
        iqama,
        mobile,
        orderDate,
        model: savedData.model,
        color: savedData.color,
        storage: savedData.storage,
        dob: savedData.dob,
        nationality: savedData.nationality,
      };

      console.log(orderData);

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/orders",
          orderData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log("Success:", response.data);

          // Update the local storage with new iqama and mobile
          const updatedData = {
            ...savedData,
            iqama,
            mobile,
          };
          localStorage.setItem(
            "phoneSelectionData",
            JSON.stringify(updatedData)
          );

          // Redirect to the OTP verification page
          navigate("/number-verification");
        } else {
          console.error("Failed to submit the order:", response);
          alert(
            "There was an issue with submitting your information. Please try again."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "There was an error submitting your information. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else if (!savedData) {
      alert("No saved data found.");
    }
  };

  return (
    <div className="mx-3">
      <div>
        <h2 className="text-4xl font-bold text-center text-gray-700 my-5">
          User Information
        </h2>

        <TextField
          label="Iqama Number (10 digits)"
          variant="outlined"
          fullWidth
          value={iqama}
          onChange={(e) => setIqama(e.target.value)}
          inputProps={{ maxLength: 10 }}
          placeholder="Enter your Iqama number"
          error={!!error && !validateIqama()}
          helperText={
            error && !validateIqama()
              ? "Iqama number must be 10 digits and start with 1 or 2."
              : ""
          }
          margin="normal"
          required
        />

        <TextField
          label="Mobile Number"
          variant="outlined"
          fullWidth
          value={mobile}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (
              /^\d*$/.test(inputValue) &&
              inputValue.startsWith("05") &&
              inputValue.length <= 10
            ) {
              setMobile(inputValue);
            }
          }}
          placeholder="Enter your mobile number"
          error={!!error && !validateMobile()}
          helperText={
            error && !validateMobile()
              ? "Mobile number must be exactly 10 digits and start with '05'."
              : ""
          }
          margin="normal"
          required
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10, // Restrict to 10 digits
          }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="flex justify-center mb-5 ">
          <button
            className="bg-[#14B8A9] hover:bg-[#115752] text-white px-4 py-2 rounded mt-4 w-full flex justify-center items-center gap-4 text lg:text-md"
            onClick={handleSubmit}
          >
            <span className="font-bold ">NEXT</span>{" "}
            <FaArrowRightLong className="mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
