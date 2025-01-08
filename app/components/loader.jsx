import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
