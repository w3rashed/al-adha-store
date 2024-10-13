import { useState } from "react";
import TextField from "@mui/material/TextField";
import useOrderData from "../../Hooks/useOrderData";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { FaArrowRightLong } from "react-icons/fa6";

const UserDetails = () => {
  const { lastOrder, refetch } = useOrderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate(); // Initialize useNavigate

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    city: "",
    address: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle next button click
  const handleNext = async () => {
    try {
      await axiosPublic.patch(`order-update/${lastOrder._id}`, formData);

      refetch();
      navigate("/nafathOne");
    } catch (error) {
      console.error("Error updating order:", error);
      Swal.fire("Error", "Failed to update order", "error");
    }
  };

  return (
    <div className="container mx-auto lg:w-3/4  sm:w-full px-4">
      <h3 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 my-5">
        User Details
      </h3>

      {/* Grid for the form fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
        <div className="w-full ">
          <TextField
            className="text-lg sm:text-2xl"
            name="name"
            label="Please Enter Your Name"
            variant="outlined"
            required
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            inputProps={{
              style: { fontSize: "22px", color: "#1F2937" }, // Darker text color
            }}
            InputLabelProps={{ style: { color: "#4B5563" } }} // Slightly lighter label
          />
        </div>

        <div className="w-full ">
          <TextField
            className="text-lg sm:text-2xl"
            name="salary"
            label="Please Enter Your Current Monthly Income"
            variant="outlined"
            required
            value={formData.salary}
            onChange={handleInputChange}
            type="number"
            fullWidth
            inputProps={{
              min: 0,
              style: { fontSize: "22px", color: "#1F2937" }, // Darker text color
            }}
            InputLabelProps={{ style: { color: "#4B5563" } }} // Slightly lighter label
            sx={{
              "& input[type=number]": {
                "-moz-appearance": "textfield",
                "-webkit-appearance": "none",
                appearance: "textfield",
              },
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
            }}
          />
        </div>

        <div className="w-full ">
          <TextField
            className="text-lg sm:text-2xl"
            name="city"
            label="Please Enter City"
            variant="outlined"
            required
            value={formData.city}
            onChange={handleInputChange}
            fullWidth
            inputProps={{
              style: { fontSize: "22px", color: "#1F2937" }, // Darker text color
            }}
            InputLabelProps={{ style: { color: "#4B5563" } }} // Slightly lighter label
          />
        </div>

        <div className="w-full ">
          <TextField
            className="text-lg sm:text-2xl"
            name="address"
            label="Please Enter Your Full Address"
            variant="outlined"
            required
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            inputProps={{
              style: { fontSize: "22px", color: "#1F2937" }, // Darker text color
            }}
            InputLabelProps={{ style: { color: "#4B5563" } }} // Slightly lighter label
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center my-5 ">
        <button
          className="bg-[#14B8A9] hover:bg-[#115752] text-white px-4 py-2 rounded mt-4 w-full flex justify-center items-center gap-4 text-2xl"
          onClick={handleNext}
        >
          <span className="font-bold">NEXT</span>
          <FaArrowRightLong className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
