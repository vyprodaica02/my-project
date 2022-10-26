import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
const Header = () => {
  const [data, setData] = useState("");
  console.log(data);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users"));
    if (data) {
      setData(data);
    }
  }, [setData]);
  // console.log(data.wasLogin);
  return (
    <header className="header flex items-center justify-center gap-x-5 text-white py-5 my-16 border border-blue-500 rounded-lg">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "text-primary py-2 px-4 border border-white rounded-md"
            : "py-2 px-4 border border-white rounded-md"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive
            ? "text-primary py-2 px-4 border border-white rounded-md"
            : " py-2 px-4 border border-white rounded-md"
        }
      >
        Movie
      </NavLink>
      {!data.wasLogin ? (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-primary py-2 px-4 border border-white rounded-md"
              : "py-2 px-4 border border-white rounded-md"
          }
        >
          Login
        </NavLink>
      ) : (
        ""
      )}
      {data.wasLogin ? <Logout></Logout> : ""}
    </header>
  );
};

function Logout() {
  // const navigate = useNavigate();

  const [data, setData] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users"));
    if (data) {
      setData(data);
    }
  }, [setData]);
  const handleChange = () => {
    const newUpdate = {
      ...data,
      wasLogin: false,
    };
    localStorage.setItem("users", JSON.stringify(newUpdate));
    window.location.href = "/my-project";
  };
  console.log(data);
  return (
    <div
      onClick={handleChange}
      className="cursor-pointer py-2 px-4 border border-white rounded-md"
    >
      Log Out
    </div>
  );
}

export default Header;
