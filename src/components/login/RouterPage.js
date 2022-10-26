import React from "react";
import { useNavigate } from "react-router-dom";

const RouterPage = ({ router, child, className }) => {
  const navigate = useNavigate();
  const handleGotoLogin = () => {
    navigate(`/${router}`);
  };
  return (
    <div>
      <div
        className={`text-center cursor-pointer  mt-7 ${className}`}
        onClick={() => handleGotoLogin(router)}
      >
        {child}
      </div>
    </div>
  );
};

export default RouterPage;
