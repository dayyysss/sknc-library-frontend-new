import React from "react";
import Navbar from "../../components/Landing/Navbar";
import Home from "../../components/Landing/Beranda";
import About from "../../components/Landing/Tentang";
import Courses from "../../components/Landing/Layanan";
import Reviews from "../../components/Landing/Pustakawan";
import Contact from "../../components/Landing/Kontak";
import Footer from "../../components/Landing/Footer";

const Landing = () => {
  document.title = "Skanic Library";
  return (
    <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="service">
          <Courses />
        </div>

        <div id="librarian">
          <Reviews />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
