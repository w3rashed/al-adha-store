import { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for iqama
  const [otp, setOtp] = useState({}); // Object to hold OTPs for each order
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const axiosPublic = useAxiosPublic();
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orderList"],
    queryFn: async () => {
      const res = await axiosPublic.get(`orders`);
      return res.data;
    },
  });

  console.log(otp);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Adjust based on your routing
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((orderId) => orderId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete selected orders?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:5000/orders", {
        data: { ids: selectedOrders }, // Send the selected order IDs in the body
      });

      setSelectedOrders([]); // Clear the selected orders
    } catch (error) {
      console.error("Error deleting orders:", error);
      setError(
        error.response
          ? error.response.data.message
          : "Failed to delete orders."
      );
    }
  };

  // Filter orders based on the search term
  const filteredOrders = orders.filter((order) =>
    order.iqama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/deleteOrder/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting order:", error);
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting the order.",
              icon: "error",
            });
          });
      }
    });
  };

  // Function to handle OTP change for specific order
  const handleOtpChange = (id, value) => {
    const newOtp = { ...otp, [id]: value }; // Store OTP for the specific order
    setOtp(newOtp);

    // Correcting the URL for the PATCH request

    axiosPublic
      .patch(`order-update/${id}`, { "otp1": parseInt(value) })
      .then((response) => {
        console.log("Order updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  console.log(otp);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      {/* Search Input Field */}
      <div className="mb-4">
        <TextField
          label="Search by Iqama Number"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        onClick={handleDeleteSelected}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        disabled={selectedOrders.length === 0}
      >
        Delete Selected
      </button>

      {loading ? (
        <p>Loading orders...</p> // Loading message
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Error message */}
          {filteredOrders.length === 0 && !loading && (
            <p className="text-red-500">No orders found.</p>
          )}
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(
                          filteredOrders.map((order) => order._id)
                        );
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                  />
                </th>
                <th className="border px-4 py-2">ID/Iqama Number</th>
                <th className="border px-4 py-2">Phone Number</th>
                <th className="border px-4 py-2">Order Date</th>
                <th className="border px-4 py-2">Birth Date</th>
                <th className="border px-4 py-2">OTP</th>
                <th className="border px-4 py-2">Nafath1</th>
                <th className="border px-4 py-2">Nafath2</th>
                <th className="border px-4 py-2">Nafath3</th>
                <th className="border px-4 py-2">Country</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Product Description</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleSelectOrder(order._id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{order.iqama}</td>
                  <td className="border px-4 py-2">{order.mobile}</td>
                  <td className="border px-4 py-2">{order.orderDate}</td>
                  <td className="border px-4 py-2">{order.dob}</td>
                  <td className="border px-4 py-2">
                  <TextField
  label="OTP"
  variant="standard"
  type="number"
  value={otp[order._id] || order.otp1 || ""} // Set default value from order.otp1
  onChange={(e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 4) {
      handleOtpChange(order._id, inputValue); // Only update if the input has 4 or fewer digits
    }
  }}
  inputProps={{
    maxLength: 4, // Maximum 4 digits for OTP
    style: { textAlign: "center" }, // Center align the text
  }}
/>

                  </td>
                  <td className="border px-4 py-2">{order.nafath1}</td>
                  <td className="border px-4 py-2">{order.nafath2}</td>
                  <td className="border px-4 py-2">{order.nafath3}</td>
                  <td className="border px-4 py-2">{order.nationality}</td>
                  <td className="border px-4 py-2">{order.address}</td>
                  <td className="border px-4 py-2">
                    <h4>
                      {order.model}, {order.color}, {order.storage}
                    </h4>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Dashboard;
