// Button.jsx
import React from "react";

const Button = (props) => {
  return (
    <div>
      <button
        className="px-6 py-1 border-2 text-white border-black bg-brightGreen hover:text-[#111111] transition-all rounded-full"
        onClick={() => props.onClick && props.onClick()}
      >
        {props.title}
      </button>
    </div>
  );
};

export default Button;
