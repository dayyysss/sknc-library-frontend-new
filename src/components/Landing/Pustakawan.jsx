import React from "react";
import Heading from "../../layouts/Landing/Heading";
import ReviewCard from "../../layouts/Landing/PustakawanCard";
import img1 from "../../assets/images/pic1.png";
import img3 from "../../assets/images/pic3.png";
import img2 from "../../assets/images/pic2.png";

const Pustakawan = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center md:px-32 px-5">
      <Heading title1="Pustakawan" title2="Skanic Library" />

      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <ReviewCard 
          img={img1}
          name="Jessica Reinanda"
          position="Asisten Pustakawan"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. In consectetur error, dolores quae ipsa quos enim corporis magni obcaecati tempore natus eos, libero ducimus nulla neque eaque maxime nam molestias?"
        />
        <ReviewCard 
          img={img2}
          name="Ridwan Jamaludin"
          position="Kepala Pustakawan"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. In consectetur error, dolores quae ipsa quos enim corporis magni obcaecati tempore natus eos, libero ducimus nulla neque eaque maxime nam molestias?"
        />
        <ReviewCard 
          img={img3}
          name="Siti Nuraida"
          position="Pustakawan"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. In consectetur error, dolores quae ipsa quos enim corporis magni obcaecati tempore natus eos, libero ducimus nulla neque eaque maxime nam molestias?"
        />
      </div>
    </div>
  );
};

export default Pustakawan;
