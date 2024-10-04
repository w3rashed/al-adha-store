import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePiker = ({ selectedDate, onDateChange }) => {
    const [year, setYear] = useState(null); // State to store the selected year
  const [date, setDate] = useState(selectedDate); // State to store the selected date

  const handleYearChange = (year) => {
    setYear(year); // Set the selected year
    setDate(null); // Reset the date when a new year is selected
  };

  // Format the year for display
  const yearFormat = (date) => {
    if (date) return date.getFullYear();
    return null;
  };
  return (
    <div className="flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">Select a Date</h2>
    {/* Year Picker */}
    <DatePicker
      selected={year ? new Date(year, 0) : null}
      onChange={(date) => handleYearChange(date.getFullYear())}
      showYearPicker
      dateFormat="yyyy"
      className="border rounded-lg p-2 mb-4"
      placeholderText="Select Year"
    />
    {/* Date Picker */}
    {year && (
      <DatePicker
        selected={date}
        onChange={(date) => {
          setDate(date);
          onDateChange(date); // Pass the selected date to the parent
        }}
        className="border rounded-lg p-2"
        placeholderText="Select Date"
        minDate={new Date(year, 0, 1)} // Min date is January 1 of the selected year
        maxDate={new Date(year, 11, 31)} // Max date is December 31 of the selected year
      />
    )}
  </div>
  );
};

export default CustomDatePiker;
