import React, { useState } from "react";
// Import logo dari folder assets agar Vite memprosesnya dengan benar
import logoImage from "./assets/logo.png"; 

function App() {
  // State untuk mengontrol konten di sisi kanan (Portfolio)
  const [currentPage, setCurrentPage] = useState(0);

  const portfolioPages = [
    { 
      title: "Portfolio Display 1", 
      tagline: "KUALITAS TERJAMIN SEJAK 2014",
      desc: "Produk konveksi unggulan dengan standar garment internasional." 
    },
    { 
      title: "Portfolio Display 2", 
      tagline: "PROFESIONAL & TEPAT WAKTU",
      desc: "Pengadaan barang skala besar dengan sistem manajemen profesional." 
    },
    { 
      title: "Portfolio Display 3", 
      tagline: "KEAHLIAN TEKNIS TINGGI",
      desc: "Dikerjakan oleh tenaga ahli berpengalaman di bidang industri kreatif." 
    },
  ];

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % portfolioPages.length);
  };

  return (
    <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-center p-4 font-sans text-[#1a1a1a]">
      {/* Container Utama - Sesuai dashboard_2.png */}
      <div className="w-full max-w-7xl bg-[#f3f4f6] rounded-[50px] shadow-2xl flex flex-col relative overflow-hidden min-h-[85vh] border border-white/50">
        
        {/* Navbar Melayang Hitam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75%] bg-[#222] h-20 rounded-b-[45px] z-20 flex items-center px-12 shadow-2xl border-x border-b border-white/10">
          <div className="flex-shrink-0">
            {/* Menggunakan logoImage yang di-import dari assets */}
            <img src={logoImage} alt="LocalVendor" className="h-7 w-auto brightness-200" />
          </div>
          <div className="ml-auto bg-white/95 backdrop-blur-sm rounded-full p-1.5 flex gap-1 shadow-inner border border-white/20">
            <a href="#" className="bg-[#ff5722] text-white px-7 py-2.5 rounded-full text-[13px] font-black tracking-wide uppercase">Home</a>
            <a href="#" className="text-gray-400 px-5 py-2.5 text-[13px] font-bold hover:text-black transition-colors uppercase">About Us</a>
            <a href="#" className="text-gray-400 px-5 py-2.5 text-[13px] font-bold hover:text-black transition-colors uppercase">Products</a>
            <a href="#" className="text-gray-400 px-5 py-2.5 text-[13px] font-bold hover:text-black transition-colors uppercase">Gallery</a>
            <a href="#" className="text-gray-400 px-5 py-2.5 text-[13px] font-bold hover:text-black transition-colors uppercase">Contact</a>
          </div>
        </div>

        <div className="flex flex-1 pt-12">
          {/* Sisi Kiri: Informasi (Statis) */}
          <div className="w-full md:w-[38%] p-16 flex flex-col justify-center border-r border-gray-200/50">
            <h1 className="text-4xl font-black leading-[0.9] mb-6 uppercase tracking-tighter">
              ONE STOP SOLUTION<br />BRAND NEEDS
            </h1>
            <p className="text-[12px] text-gray-400 mb-10 leading-relaxed font-medium max-w-xs">
              LocalVendor merupakan usaha kecil menengah (UKM) yang bergerak di bidang industri jasa (KONVEKSI/GARMENT) dan pengadaan barang. Berdiri sejak 2014.
            </p>

            <div className="space-y-5 border-t border-gray-300 pt-10 mb-10">
              <h2 className="text-2xl font-bold text-gray-300 uppercase italic tracking-widest transition-colors hover:text-gray-400 cursor-default">KEISTIMEWAAN</h2>
              <h2 className="text-2xl font-bold text-gray-300 uppercase italic tracking-widest transition-colors hover:text-gray-400 cursor-default">PROFESIONAL</h2>
              <h2 className="text-2xl font-bold text-black uppercase italic tracking-widest cursor-default">KEAHLIAN</h2>
            </div>

            {/* Widget Highlight dengan Tombol Panah Kecil */}
            <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 relative group">
              <span className="text-[10px] text-gray-400 block mb-3 uppercase tracking-widest font-black text-center">highlight</span>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4">
                <div className="bg-[#ff5722] h-full w-[45%] transition-all duration-700"></div>
              </div>
              {/* Tombol panah kecil di kiri bawah sesuai dashboard_2.png */}
              <button 
                onClick={handleNextPage}
                className="bg-[#ff5722] w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                <span className="font-bold text-lg">↗</span>
              </button>
            </div>

            <div className="mt-10 flex gap-5">
              <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all">f</button>
              <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all">y</button>
              <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all">i</button>
            </div>
          </div>

          {/* Sisi Kanan: Area Visual (Dinamis/Bisa Digeser) */}
          <div className="flex-1 bg-[#f9fafb] relative flex items-center justify-center m-5 rounded-[45px] shadow-[inset_0_2px_20px_rgba(0,0,0,0.03)] overflow-hidden border border-white">
            
            {/* Animasi Transisi Konten */}
            <div key={currentPage} className="text-center animate-in fade-in zoom-in duration-500">
              <h3 className="text-gray-200 italic font-black text-6xl tracking-tighter uppercase opacity-40 select-none">
                {portfolioPages[currentPage].title}
              </h3>
              <p className="text-[#ff5722] mt-4 font-black tracking-widest text-sm uppercase">{portfolioPages[currentPage].tagline}</p>
              <p className="text-gray-400 mt-2 text-xs font-medium max-w-xs mx-auto leading-relaxed">{portfolioPages[currentPage].desc}</p>
            </div>

            {/* Tombol Panah Oranye Besar - Sesuai dashboard_2.png */}
            <button 
              onClick={handleNextPage}
              className="absolute right-10 top-1/2 -translate-y-1/2 bg-[#ff5722] p-6 rounded-2xl shadow-2xl hover:bg-[#e64a19] active:scale-90 transition-all group border border-white/20"
            >
              <span className="text-white font-black text-3xl block group-hover:translate-x-1 transition-transform">➔</span>
            </button>

            {/* WhatsApp Floating */}
            <a 
              href="https://wa.me/6281224923591" 
              target="_blank" 
              rel="noreferrer"
              className="absolute bottom-10 right-10 bg-[#25d366] text-white px-8 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all font-black text-[12px] uppercase tracking-wider z-30"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;