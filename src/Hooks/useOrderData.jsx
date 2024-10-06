// src/hooks/useOrderData.js
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"; // Adjust the path as necessary

const useOrderData = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const axiosPublic = useAxiosPublic();

  // Fetch order data based on mobile number
  const { data: orderData = {}, refetch } = useQuery({
    queryKey: ["orderdData", mobileNumber],
    queryFn: async () => {
      if (!mobileNumber) return {};
      const res = await axiosPublic.get(`orderdPhone/${mobileNumber}`);
      return res.data;
    },
    enabled: !!mobileNumber, // Only fetch if mobileNumber is present
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
    if (orderData && orderData.length > 0) {
      // Sort the orderData array by orderDate in ascending order
      const sortedOrderData = [...orderData].sort(
        (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
      );
      // Get the last object in the sorted array
      setLastOrder(sortedOrderData[sortedOrderData.length - 1]);
    }
  }, [orderData]);

  return { orderData, lastOrder, mobileNumber, refetch };
};

export default useOrderData;
