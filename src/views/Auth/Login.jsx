import React, { useState, useRef, useEffect } from "react";
import Ilustration from "../../assets/images/ilus-logdaf.svg";
import { Link } from "react-router-dom";
import Api from "../../api/index.jsx";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const Login = () => {
  document.title = "Login - Skanic Library";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await Api.post("/api/login", {
        email,
        password,
      });

      if (!email || !password) {
        toast.error("Email dan password harus diisi", {
          position: "top-center",
        });
        setIsLoading(false);
        return;
      }

      if (response.data.success) {
        const { roles, token, user_id, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);

        // Simpan data ke cookies
        Cookies.set("token", token);
        Cookies.set("name", JSON.stringify(user.name));
        Cookies.set("roles", roles[0]);

        let redirectPath = "";
        if (roles.includes("admin")) {
          redirectPath = "/dashboard-admin";
        } else if (roles.includes("pustakawan")) {
          redirectPath = "/dashboard-pustakawan";
        } else if (roles.includes("anggota")) {
          redirectPath = "/dashboard-anggota";
        } else {
          console.error("Invalid roles");
          return;
        }

        toast.success("Login Berhasil!", {
          position: "top-center",
        });

        setTimeout(() => {
          window.location.href = redirectPath;
        }, 2000);

        if (rememberMe) {
          Cookies.set("rememberedEmail", email);
        } else {
          Cookies.remove("rememberedEmail");
        }
      } else {
        toast.error("Gagal masuk, email atau kata sandi salah", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat masuk", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  const handleOutsideClick = (e) => {
    const modal = document.getElementById("modal");
    if (modal && !modal.contains(e.target)) {
      toggleModal();
    }
  };

  return (
    <div className="grid md:grid-cols-2 md:gap- place-items-center w-full min-h-screen">
      <div className="hidden md:block md:w-full">
        <img src={Ilustration} alt="Ilustration" />
      </div>
      <div className="flex flex-col justify-center items-center w-4/5">
        <h3 className="mb-4 text-2xl font-bold text-green-600 uppercase">
          Masuk Skanic Library
        </h3>
        <div className="w-full">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="email"
                className="mb-1 text-sm text-green-400 font-semibold uppercase"
                style={{ alignSelf: "flex-start", marginLeft: "2px" }}
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                placeholder="Masukkan email anda"
                className="w-full border-2 border-green-500 rounded-lg p-2 placeholder:text-sm focus-visible:outline-none focus:border-green-400"
              />
            </div>

            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="password"
                className="mb-1 text-sm text-green-400 font-semibold uppercase"
                style={{ alignSelf: "flex-start", marginLeft: "2px" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="Masukkan password anda"
                className="w-full border-2 border-green-500 rounded-lg p-2 placeholder:text-sm focus-visible:outline-none focus:border-green-400"
                required={false}
              />
            </div>

            {/* 
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div> */}

            <div className="w-full">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-500 px-2 py-3 mt-4 text-white font-semibold tracking-widest uppercase rounded-lg hover:bg-green-300 cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-500 mt-4">
            Baca terlebih dahulu{" "}
            <Link
              to="#"
              className="text-green-500 hover:text-green-700"
              onClick={toggleModal} // Panggil fungsi untuk menampilkan modal
            >
              syarat & ketentuan
            </Link>
          </p>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" id="modal">
              {/* Your modal content here */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                      Syarat & Ketentuan Skanic Library
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        1. Wajib warga sekolah SMKN 01 Ciomas.<br />
                        2. Keterlambatan dan Denda: Denda keterlambatan dikenakan per hari per buku yang terlambat dikembalikan. Pembayaran denda harus diselesaikan sebelum anggota dapat meminjam buku lain.<br />
                        3. Akun Pengguna: Setiap anggota harus memiliki akun pengguna yang dilindungi dengan kata sandi yang aman. Pengguna bertanggung jawab untuk menjaga kerahasiaan informasi akun mereka. <br />
                        4. Akses dan Penggunaan: Layanan peminjaman online hanya dapat digunakan oleh anggota yang sah. Penggunaan akun oleh orang lain selain pemilik akun dilarang. < br />
                        5. Kerahasiaan dan Privasi: Informasi pribadi anggota akan dijaga kerahasiaannya dan tidak akan dibagikan kepada pihak ketiga tanpa izin anggota, kecuali jika diwajibkan oleh hukum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={toggleModal} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
