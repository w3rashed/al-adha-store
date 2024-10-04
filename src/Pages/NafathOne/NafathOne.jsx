import useOrderData from "../../Hooks/useOrderData";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState, useEffect } from "react";

const NafathOne = () => {
  const { orderData, refetch } = useOrderData();
  const nafat = orderData?.nafath1;

  const [key, setKey] = useState(0); // State to force re-render

  const handleComplete = () => {
    console.log("Countdown completed");
    setKey((prevKey) => prevKey + 1); // Change key to restart the timer
  };

  // Set up a refetch interval
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000); 

    return () => clearInterval(interval); 
  }, [refetch]); 

  console.log(nafat);

  return (
    <div>
      <h3 className="text-center text-4xl font-bold text-gray-700 my-5">
        First Nafat
      </h3>

      {/* Show countdown only if nafat is not available */}
      {!nafat && (
        <div className="flex justify-center my-5">
          <div className="relative">
            <CountdownCircleTimer
              key={key} // Use key to force re-render
              isPlaying
              duration={180}
              colors={["#14B8A9"]}
              colorsTime={[180]}
              onComplete={handleComplete}
              size={150} // Base size
              strokeWidth={6}
            >
              {({ remainingTime }) => {
                const minutes = Math.floor(remainingTime / 60);
                const seconds = remainingTime % 60;
                const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

                return (
                  <div className="text-2xl">
                    {`${minutes}:${formattedSeconds}`}
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>
        </div>
      )}

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

      {nafat && (
        <div className="flex justify-center my-5"> 
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              console.log("Next button clicked");
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NafathOne;
