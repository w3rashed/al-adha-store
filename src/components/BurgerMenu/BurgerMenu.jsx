import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrLogout } from "react-icons/gr";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { PiVan } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Admin logout Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <div className="flex items-center gap-5 ">
        <button onClick={toggleMenu} className="p-2 text-2xl">
          <GiHamburgerMenu />
        </button>
        <h3 className="text-2xl font-bold">ES Waap</h3>
      </div>

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button onClick={toggleMenu} className="text-xl ml-3 mt-3 text-xl">
            <IoClose />
          </button>
        </div>
        <ul className="mt-4 space-y-4 ml-6">
          <h3 className="font-bold text-3xl">ES waap</h3>
          <li className="p-2 hover:bg-gray-100 rounded-md px-4 cursor-pointer flex items-center gap-3">
            {" "}
            <IoSettingsOutline />
            <p>Prouct Customization</p>
          </li>
          <li className="p-2 hover:bg-gray-100 rounded-md px-4 cursor-pointer flex items-center gap-3">
            <FaRegUserCircle />
            <p> User Info</p>
          </li>
          <Link to="/reset-admin-password">
            <li className="p-2 hover:bg-gray-100 rounded-md px-4 cursor-pointer flex items-center gap-3 mt-2">
              <RiLockPasswordLine /> <p>Update PassWord</p>
            </li>
          </Link>

          <Link to="/dashboard">
            <li className="p-2 hover:bg-gray-100 rounded-md px-4 cursor-pointer flex items-center gap-3">
              <PiVan /> <p>Order List</p>
            </li>
          </Link>

          <li
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-md px-4 cursor-pointer flex items-center gap-3"
          >
            <GrLogout /> <p>Log Out</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
