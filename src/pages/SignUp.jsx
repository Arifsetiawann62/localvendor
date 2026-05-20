import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState(""); // State baru untuk kontak
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // Simpan ke Firestore dengan data WhatsApp
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: name,
        email: email,
        whatsapp: whatsapp, // Data penting untuk admin
        role: "customer",
        createdAt: new Date(),
      });

      alert("Akun berhasil dibuat! Silakan belanja.");
      navigate("/");
    } catch (err) {
      alert("Gagal daftar: " + err.message);
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
            Join The <br />
            <span className="text-orange-500">LocalVendor</span>
          </h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Nama Lengkap" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-orange-500 font-bold" onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Alamat Email" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-orange-500 font-bold" onChange={(e) => setEmail(e.target.value)} />
          
          {/* Input WhatsApp Baru */}
          <input type="number" placeholder="Nomor WhatsApp (Contoh: 62812...)" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-orange-500 font-bold" onChange={(e) => setWhatsapp(e.target.value)} />
          
          <input type="password" placeholder="Password (Min. 6 Karakter)" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-orange-500 font-bold" onChange={(e) => setPassword(e.target.value)} />

          <button className="w-full bg-orange-500 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all text-white mt-4 shadow-lg shadow-orange-500/20">
            Daftar Sekarang
          </button>
        </form>

        <div className="mt-6 text-center text-slate-500 text-sm">
          Sudah punya akun? <button onClick={() => navigate("/login")} className="text-orange-500 font-bold">Login di sini</button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;