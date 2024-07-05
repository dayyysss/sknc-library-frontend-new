import React from "react";

const LayananCard = (props) => {
  return (
    <div className="flex flex-col items-center justify-between bg-[#F5F7F8] border-2 border-lightText md:border-none md:w-2/5 p-5 cursor-pointer rounded-lg hover:shadow-[rgba(0,0,0,0.24) 0px 3px 8px] transition-all">
      <div className="w-3/5">
        <img src={props.img} alt="img" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-center my-5">{props.title}</h3>
        <p className="text-lightText text-center md:text-start">{props.text}</p>
      </div>
    </div>
  );
};

export default LayananCard;
