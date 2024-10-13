import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FaArrowRightLong } from "react-icons/fa6";
import NafatText from "../../components/NafatText/NafatText";
import useOrderData from "../../Hooks/useOrderData";

const NafathOne = () => {
  const { orderData, lastOrder, refetch } = useOrderData();
  const nafat = lastOrder?.nafath1;
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [isAutoReloading, setIsAutoReloading] = useState(true);
  // Set up a refetch interval
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    // If nafat is available, stop auto-reload
    if (nafat) {
      setIsAutoReloading(false); // Stop the auto reload when nafat is available
    }

    // Reload the page every 5 seconds if auto-reloading is enabled
    let timeout;
    if (isAutoReloading) {
      timeout = setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout); // Cleanup timeout when component unmounts or when nafat is set
    };
  }, [refetch, nafat, isAutoReloading]);

  // Handle the next button click
  const handleNext = () => {
    // Convert inputCode to a number before comparing
    const inputCodeAsNumber = Number(inputCode);

    if (nafat === inputCodeAsNumber) {
      // Success: Show SweetAlert and then redirect
      Swal.fire({
        position: "top",
        icon: "success",
        title: "First Nafat Verification done",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/secondNafath");
      });

      setError(""); // Clear any previous error
    } else {
      setError("The entered code does not match the Nafath code.");
    }
  };

  console.log(lastOrder);

  return (
    <div>
      <h3 className="text-center text-4xl font-bold text-gray-700 my-5">
        First Nafat
      </h3>

      <div className="border-8 rounded-full w-44 h-44 text-center flex items-center justify-center mx-auto mb-5">
        {nafat ? (
          <p className="flex flex-col justify-center font-bold text-5xl">
            {` ${nafat}`}
          </p>
        ) : (
          <p className="flex flex-col justify-center font-medium">
            First Nafat is <span>Loading...</span>
          </p>
        )}
      </div>

      {!nafat ? (
        <div>
          <NafatText></NafatText>
          <div className="flex justify-center py-5">
            <div className="border rounded-full w-16 h-16 flex justify-center items-center font-medium">
              <h4>N/A</h4>
            </div>
          </div>
          <div className="flex justify-center mt-3 mb-5">
            <Link to="https://play.google.com/store/apps/details?id=sa.gov.nic.myid&pli=1">
              <button className="border border-green-700 px-4 py-2 text-green-700 font-bold">
                OPEN NAFATH APP
              </button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      {nafat && (
        <div className="flex justify-center mx-3">
          <div className="flex flex-col justify-center items-center my-5 w-1/2">
            <TextField
              className="text-2xl"
              id="standard-basic"
              label="Enter Nafath Code"
              variant="standard"
              type="tel"
              fullWidth // Makes the input full width
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              error={!!error} // Error styling if error exists
              helperText={error} // Display error message below input
            />
            <div className="flex justify-center mb-5">
              <button
                className="bg-[#14B8A9] hover:bg-[#115752] text-white px-4 py-2 rounded mt-4 w-full flex justify-center items-center gap-4 text lg:text-md"
                onClick={handleNext}
              >
                <span className="font-bold">NEXT</span>{" "}
                <FaArrowRightLong className="mt-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NafathOne;
