import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert("Email atau password salah, bro!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 p-10 rounded-[40px] border border-white/10 w-full max-w-md backdrop-blur-xl"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Back To <br />
            <span className="text-orange-500">LocalVendor</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Alamat Email" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-orange-500 font-bold" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-orange-500 font-bold" onChange={(e) => setPassword(e.target.value)} />
          
          <button className="w-full bg-orange-500 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all text-white mt-4 shadow-lg shadow-orange-500/20">
            Masuk Sistem
          </button>
        </form>

        <div className="mt-6 text-center text-slate-500 text-sm">
          Belum punya akun? <button onClick={() => navigate("/signup")} className="text-orange-500 font-bold">Daftar di sini</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;