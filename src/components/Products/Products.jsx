import { FaRegCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductSlider from "../ProductSlider/ProductSlider";

const Products = () => {
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [storage, setStorage] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");

  const models = [
    "iPhone 14",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max",
    "iPhone 15",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max",
  ];
  const colors = ["#301933", "#205E7C", "#A50011", "#F9E5C9", "#5C5B56"];
  const storages = ["128GB", "256GB", "512GB"];
  const nationalities = [
    "Afghanistan",
    "Bahrain",
    "Bangladesh",
    "China",
    "Egypt",
    "Ethiopia",
    "Ghana",
    "Hong Kong",
    "India",
    "Indonesia",
    "Jordan",
    "Kenya",
    "Macao",
    "Myanmar",
    "Namibia",
    "Nepal",
    "Niger",
    "Nigeria",
    "Pakistan",
    "Papua New Guinea",
    "Peru",
    "Philippines",
    "Saudi Arabia",
    "Slovakia",
    "Somalia",
    "South Sudan",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Syrian",
    "Turkey",
    "Uganda",
    "Uruguay",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const isFormComplete = model && color && storage && dob && nationality;
  const navigate = useNavigate();

  const handleAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "Please select all options",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleNext = () => {
    if (isFormComplete) {
      // Save form data to localStorage
      const formData = { model, color, storage, dob, nationality };
      localStorage.setItem("phoneSelectionData", JSON.stringify(formData));

      // Navigate to the next page
      navigate("/userInfo");
    } else {
      handleAlert(); // Use SweetAlert for incomplete forms
    }
  };

  return (
    <div className="">
      <div className="mx-4">
        <h3 className="text-[#0F5E59] text-4xl font-semibold text-center mt-5">
          Apple iPhones
        </h3>

        {/* Product Details */}
        <div className="flex flex-col lg:flex-row justify-around mt-5">
          {/* Product Image */}
          <div className="lg:ml-20">
            <ProductSlider></ProductSlider>
          </div>
          <div className="mx-auto ">
            <h2 className="text-3xl lg:text-2xl font-semibold ">Select Your iPhone</h2>

            {/* Model Selection */}
            <div className="flex my-5  gap-8">
              <h3 className="text-2xl font-semibold">Model:</h3>
              <div className="grid grid-cols-3 gap-">
                {models.map((item) => (
                  <button
                    className="text-2xl lg:text-base"
                    key={item}
                    onClick={() => setModel(item)}
                    style={{
                      backgroundColor: model === item ? "#0D9488" : "",
                      color: model === item ? "white" : "black",
                      padding: "10px",
                      margin: "5px",
                      border: "1px solid",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="flex items-center gap-10">
              <h3 className="text-2xl font-semibold">Color:</h3>
              <div>
                {colors.map((item) => (
                  <button key={item} onClick={() => setColor(item)}>
                    <h4
                      className="h-14  w-14 rounded-full mr-2 flex justify-center items-center cursor-pointer"
                      style={{ background: item }}
                    >
                      <FaRegCheckCircle
                        className="text text-4xl hidden "
                        style={{
                          display: color === item ? "block" : "none",
                          color: color === item ? "white" : "",
                        }}
                      />
                    </h4>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="flex items-center gap-8 my-5">
              <h3 className="text-2xl font-semibold">Storage:</h3>
              <div>
                {storages.map((item) => (
                  <button
                    key={item}
                    onClick={() => setStorage(item)}
                    className="text-2xl lg:text-base"
                    style={{
                      backgroundColor: storage === item ? "#0D9488" : "",
                      color: storage === item ? "white" : "black",
                      padding: "10px",
                      margin: "5px",
                      border: "1px solid",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Date of Birth Selection */}
            <div>
              <label className=" flex items-center">
                <p className="text-2xl font-semibold">Date of Birth:</p>
                <input
                  className="ml-2 border-[1px] border-black px-4 py-2 rounded-md"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </label>
            </div>
            {/* <DatePicker label={'"year"'} openTo="year" /> */}

            {/* Nationality Selection */}
            <div>
              <label className="flex items-center mt-1 ">
                <h4 className="text-2xl font-semibold">Nationality:</h4>
                <select
                  className="border-[1px] border-black rounded-md py-2 px-4 my-5 ml-5"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option value="">Select Nationality</option>
                  {nationalities.map((nation) => (
                    <option key={nation} value={nation}>
                      {nation}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Display Selected Options */}
            <div className="flex gap-2  opacity-60">
              <h3 className="font-semibold ">Your Selections:</h3>
              <h4>
                {model}, {color}, {storage}, {dob}, {nationality}
              </h4>
            </div>

            {/* Next Button */}
            <button
              className={`py-6 lg:py-2 w-full my-5 rounded-md flex justify-center items-center gap-3 font-bold text-2xl ${
                isFormComplete
                  ? "bg-[#14B8A9] hover:bg-[#115752]"
                  : "bg-[#ea3636] hover:bg-[#86291e]"
              } text-white duration-500`}
              onClick={handleNext}
              disabled={!isFormComplete}
            >
              Next <FaArrowRightLong className="mt-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
