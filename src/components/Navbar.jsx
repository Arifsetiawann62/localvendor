import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logoImage from "../assets/logo.png";

const Navbar = ({ handleNavClick }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Pantau status login secara real-time
  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleAuthAction = () => {
    if (user) {
      signOut(auth).then(() => {
        alert("Berhasil Logout!");
        window.location.reload();
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center translate-y-[40%] pointer-events-none">
      <div className="flex items-center w-full max-w-[1300px] h-[85px] relative px-4 pointer-events-auto">
        {/* LOGO SECTION */}
        <div className="h-full bg-[#1e1e1e] flex items-center px-14 rounded-l-full shadow-2xl border-r border-orange-500/30">
          <img
            src={logoImage}
            alt="LocalVendor"
            className="h-10 w-auto brightness-200 contrast-125 transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* MENU SECTION */}
        <div className="flex-1 bg-white/10 backdrop-blur-2xl h-full rounded-r-full flex items-center justify-between px-10 border border-white/10 shadow-xl">
          <div className="flex items-center gap-6 ml-6">
            {["Home", "About Us", "Products", "Gallery", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-slate-400 hover:text-orange-500 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all"
              >
                {item}
              </button>
            ))}
          </div>

          {/* AUTH BUTTON (DINAMIS) */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                {user.email.split('@')[0]}
              </span>
            )}
            <button
              onClick={handleAuthAction}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                user 
                ? "bg-white/5 border border-white/10 text-slate-400 hover:bg-red-500/20 hover:text-red-500" 
                : "bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:scale-105"
              }`}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;