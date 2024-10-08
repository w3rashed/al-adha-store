import { useEffect, useState } from "react";
import useOrderData from "../../Hooks/useOrderData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { FaArrowRightLong } from "react-icons/fa6";
import NafatText from "../../components/NafatText/NafatText";

const ThirdNafat = () => {
  const { lastOrder, refetch } = useOrderData();
  const nafat = lastOrder?.nafath3;
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set up a refetch interval
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  // Handle the next button click
  const handleNext = () => {
    // Convert inputCode to a number before comparing
    const inputCodeAsNumber = Number(inputCode);

    if (nafat === inputCodeAsNumber) {
      // Success: Show SweetAlert and then redirect
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Third Nafat Verification done",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/thirdOTP"); // Redirect to secondNafath page
      });

      setError(""); // Clear any previous error
    } else {
      setError("The entered code does not match the Nafath code.");
    }
  };

  // console.log(nafat);
  return (
    <div>
      <h3 className="text-center text-4xl font-bold text-gray-700 my-5">
        Third Nafat
      </h3>

      <div className="border-8 rounded-full w-44 h-44 text-center flex items-center justify-center mx-auto mb-5">
        {nafat ? (
          <p className="flex flex-col justify-center font-bold text-5xl">
            {` ${nafat}`}
          </p>
        ) : (
          <p className="flex flex-col justify-center font-medium">
            Third Nafat is <span>Loading...</span>
          </p>
        )}
      </div>
      <NafatText></NafatText>
      {nafat && (
        <div className="flex justify-center mx-3">
          <div className="flex flex-col justify-center items-center my-5 w-1/2">
            <TextField
              id="standard-basic"
              label="Enter Nafath Code"
              variant="standard"
              fullWidth // Makes the input full width
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              error={!!error} // Error styling if error exists
              helperText={error} // Display error message below input
            />
            <div className="flex justify-center mb-5 ">
              <button
                className="bg-[#14B8A9] hover:bg-[#115752] text-white px-4 py-2 rounded mt-4 w-full flex justify-center items-center gap-4 text lg:text-md"
                onClick={handleNext}
              >
                <span className="font-bold ">NEXT</span>{" "}
                <FaArrowRightLong className="mt-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThirdNafat;
