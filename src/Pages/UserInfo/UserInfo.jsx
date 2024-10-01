import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios"; // Import axios

const UserInfo = () => {
  const [iqama, setIqama] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [savedData, setSavedData] = useState(null); // State to hold saved data

  useEffect(() => {
    // Retrieve the previously saved phone selection data from local storage
    const data = JSON.parse(localStorage.getItem("phoneSelectionData"));
    if (data) {
      setSavedData(data);
      console.log("Retrieved phone selection data:", data);
    }
  }, []);

  const validateIqama = () => {
    return iqama.length === 10 && (iqama[0] === "1" || iqama[0] === "2");
  };

  const validateMobile = () => {
    return mobile.length >= 10 && mobile.length <= 14;
  };

  const validateForm = () => {
    if (!validateIqama()) {
      setError("Iqama number must be 10 digits and start with 1 or 2.");
      return false;
    }
    if (!validateMobile()) {
      setError("Mobile number must be between 10 and 14 digits.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm() && savedData) {
      // Get the current date in YYYY-MM-DD format
      const orderDate = new Date().toISOString().split("T")[0]; // Automatically set the order date

      // Combine the data into a single object
      const orderData = {
        iqama,
        mobile,
        orderDate, // Include order date
        model: savedData.model,
        color: savedData.color,
        storage: savedData.storage,
        dob: savedData.dob,
        nationality: savedData.nationality,
      };

      alert(`Iqama: ${iqama}, Mobile: ${mobile}, Order Date: ${orderDate}`);
      console.log(orderData);

      try {
        setLoading(true); // Start loading
        const response = await axios.post("http://localhost:5000/orders", orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Handle successful response
        console.log("Success:", response.data);
        alert("User info submitted successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error submitting your information. Please try again.");
      } finally {
        setLoading(false); // Stop loading
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
          helperText={error && !validateIqama() ? "Iqama number must be 10 digits and start with 1 or 2." : ""}
          margin="normal"
          required
        />

        <TextField
          label="Mobile Number"
          variant="outlined"
          fullWidth
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter your mobile number"
          error={!!error && !validateMobile()}
          helperText={error && !validateMobile() ? "Mobile number must be between 10 and 14 digits." : ""}
          margin="normal"
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="my-5">
          <Button
            className="w-full"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
