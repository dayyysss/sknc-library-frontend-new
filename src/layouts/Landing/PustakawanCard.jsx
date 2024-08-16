import React from "react";

const PustakawanCard = (props) => {
  return (
    <div className="md:w-1/3 bg-[#F5F7F8] border-2 border-lightText md:border-none p-5 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all mx-4 md:mx-6">
      <div className="flex flex-col items-center">
        <img className="rounded-full w-1/4 mt-2 mb-3" src={props.img} alt="img" />
        <p className="text-center font-semibold">{props.name}</p>
        <p className="text-sm text-center text-lightText mb-3">{props.position}</p>
        <p className="text-lightText text-center">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default PustakawanCard;
