import { TextField, Button } from "@mui/material";
import { useState } from "react";

const UserInfo = () => {
  const [iqama, setIqama] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    // Iqama number must be exactly 10 digits and start with 1 or 2
    if (iqama.length !== 10 || (iqama[0] !== "1" && iqama[0] !== "2")) {
      setError("Iqama number must be 10 digits and start with 1 or 2.");
      return false;
    }

    // Mobile number must be between 10 and 14 digits
    if (mobile.length < 10 || mobile.length > 14) {
      setError("Mobile number must be between 10 and 14 digits.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert(`Iqama: ${iqama}, Mobile: ${mobile}`);
      // Proceed to the next step (e.g., submission or further navigation)
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
          error={
            !!error &&
            (iqama.length !== 10 || (iqama[0] !== "1" && iqama[0] !== "2"))
          }
          helperText={
            error &&
            (iqama.length !== 10 || (iqama[0] !== "1" && iqama[0] !== "2"))
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
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter your mobile number"
          error={!!error && (mobile.length < 10 || mobile.length > 14)}
          helperText={
            error && (mobile.length < 10 || mobile.length > 14)
              ? "Mobile number must be between 10 and 14 digits."
              : ""
          }
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
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
