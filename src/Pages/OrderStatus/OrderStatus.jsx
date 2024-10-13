import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import useOrderData from "../../Hooks/useOrderData";
import Swal from "sweetalert2";

const OrderStatus = () => {
  const { lastOrder } = useOrderData();
  const navigate = useNavigate();
  const [isStatusFetched, setIsStatusFetched] = useState(false); 

  useEffect(() => {
    if (!lastOrder?.status && !isStatusFetched) { 
      const interval = setInterval(() => {
        window.location.reload(); 
      }, 5000); 

      return () => clearInterval(interval);
    } else {
      setIsStatusFetched(true); 
    }
  }, [lastOrder?.status, isStatusFetched]);

  
  useEffect(() => {
    if (lastOrder?.status && !isStatusFetched) {
      Swal.fire({
        position: "top",
        title: `Your order has been ${lastOrder.status}`,
        confirmButtonText: "OK",
      }).then(() => {
        setIsStatusFetched(true);
        navigate("/"); 
      });
    }
  }, [lastOrder?.status, isStatusFetched, navigate]);

  return (
    <div>
      <div className="flex justify-center my-5">
        <CountdownCircleTimer
          isPlaying
          duration={180}
          colors={["#14B8A9"]}
          colorsTime={[180]}
          size={150}
          strokeWidth={6}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            return (
              <div className="text-2xl sm:text-3xl md:text-4xl">
                {`${minutes}:${formattedSeconds}`}
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default OrderStatus;
