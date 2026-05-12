import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 font-sans flex items-center justify-center">
      {/* Container Utama Website */}
      <div className="w-full max-w-7xl bg-[#efefef] rounded-[45px] shadow-2xl flex flex-col relative min-h-[90vh] overflow-hidden border border-white/50">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-12 py-6 z-10">
          {/* Logo Section */}
          <div className="bg-[#1a1a1a] p-6 rounded-br-[35px] -ml-12 -mt-8 flex items-center justify-center min-w-[200px]">
            <img
              src="/logo.png"
              alt="LocalVendor Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Menu Links */}
          <div className="bg-white rounded-full px-2 py-2 shadow-sm flex gap-2 text-[13px] font-bold border border-gray-100">
            <a
              href="#"
              className="bg-[#ff5722] text-white px-6 py-2 rounded-full transition-transform hover:scale-105"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-black px-4 py-2 self-center transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-black px-4 py-2 self-center transition-colors"
            >
              Products
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-black px-4 py-2 self-center transition-colors"
            >
              Gallery
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-black px-4 py-2 self-center transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sisi Kiri: Informasi Perusahaan */}
          <div className="w-full md:w-5/12 p-12 flex flex-col justify-center">
            <h1 className="text-[52px] font-black leading-[0.85] mb-6 tracking-tighter text-[#1a1a1a]">
              ONE STOP SOLUTION
              <br />
              BRAND NEEDS
            </h1>
            <p className="text-[12px] text-gray-500 mb-12 leading-relaxed max-w-xs font-medium">
              LocalVendor merupakan usaha kecil menengah (UKM) yang bergerak di
              bidang industri jasa (KONVEKSI/GARMENT) dan pengadaan barang.
              Berdiri sejak 2014.
            </p>

            {/* Fitur Utama */}
            <div className="space-y-5 border-t border-gray-300 pt-10">
              <h3 className="text-2xl font-bold text-gray-300 uppercase italic tracking-widest hover:text-gray-400 cursor-default transition-colors">
                Keistimewaan
              </h3>
              <h3 className="text-2xl font-bold text-gray-300 uppercase italic tracking-widest hover:text-gray-400 cursor-default transition-colors">
                Profesional
              </h3>
              <h3 className="text-2xl font-bold text-black uppercase italic tracking-widest cursor-default">
                Keahlian
              </h3>
            </div>

            {/* Social Media Icons (Bottom Left) */}
            <div className="mt-auto flex gap-4 pt-10">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer text-gray-700">
                f
              </div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer text-gray-700">
                y
              </div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer text-gray-700">
                i
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Area Visual (Slider/Gallery) */}
          <div className="flex-1 bg-white m-6 rounded-[40px] relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] flex items-center justify-center border border-gray-50 overflow-hidden">
            {/* Placeholder untuk Image atau Konten Produk */}
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-1 bg-gray-100 mb-4 mx-auto rounded-full group-hover:bg-[#ff5722] transition-colors"></div>
              <span className="text-gray-300 italic font-semibold text-lg tracking-widest uppercase">
                Portfolio Display
              </span>
            </div>

            {/* Tombol Navigasi Oranye (Sesuai gambar dashboard.png) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff5722] p-5 rounded-l-[25px] shadow-xl cursor-pointer hover:pr-8 transition-all duration-300 group">
              <span className="text-white font-bold text-xl block group-hover:scale-110">
                ➔
              </span>
            </div>

            <a
              href="https://wa.me/6281224923591?text=Halo%20LocalVendor,%20saya%20ingin%20tanya%20soal%20order..."
              target="_blank"
              className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
            >
              <span className="font-bold text-sm">Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
