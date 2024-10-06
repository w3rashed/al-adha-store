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
      Swal.fire("Success", "Order updated successfully", "success");
      refetch(); // Refetch data after successful update

      // Redirect to nafath1 page after successful update
      navigate("/nafathOne");
    } catch (error) {
      console.error("Error updating order:", error);
      Swal.fire("Error", "Failed to update order", "error");
    }
  };

  return (
    <div className="mx-3">
      <h3 className="text-center text-4xl font-bold text-gray-700 my-5">
        User Details
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
        <TextField
          name="name"
          label="Please Enter Your Name"
          variant="standard"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          name="salary"
          label="Please Enter Your Salary in Number"
          variant="standard"
          required
          value={formData.salary}
          onChange={handleInputChange}
          type="number"
          InputProps={{
            inputProps: { min: 0 },
          }}
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
        <TextField
          name="city"
          label="Please Enter City"
          variant="standard"
          required
          value={formData.city}
          onChange={handleInputChange}
        />
        <TextField
          name="address"
          label="Please Enter Your Full Address"
          variant="standard"
          required
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-center mb-5 ">
        <button
          className="bg-[#14B8A9] hover:bg-[#115752] text-white px-4 py-2 rounded mt-4 w-full flex justify-center items-center gap-4 text lg:text-md "
          onClick={handleNext}
        >
          <span className="font-bold ">NEXT</span>{" "}
          <FaArrowRightLong className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
