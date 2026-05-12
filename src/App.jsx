import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-7xl bg-[#efefef] rounded-[45px] shadow-2xl flex flex-col relative min-h-[90vh] overflow-hidden border border-white/50">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-12 py-6 z-10">
          <div className="bg-[#1a1a1a] p-6 rounded-br-[35px] -ml-12 -mt-8 flex items-center justify-center min-w-[200px]">
            <img src="/logo.png" alt="LocalVendor Logo" className="h-10 w-auto" />
          </div>
          <div className="bg-white rounded-full px-2 py-2 shadow-sm flex gap-2 text-[13px] font-bold border border-gray-100">
            <a href="#" className="bg-[#ff5722] text-white px-6 py-2 rounded-full">Home</a>
            <a href="#" className="text-gray-400 px-4 py-2 self-center">About Us</a>
            <a href="#" className="text-gray-400 px-4 py-2 self-center">Products</a>
            <a href="#" className="text-gray-400 px-4 py-2 self-center">Gallery</a>
            <a href="#" className="text-gray-400 px-4 py-2 self-center">Contact</a>
          </div>
        </nav>

        {/* Content */}
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="w-full md:w-5/12 p-12 flex flex-col justify-center">
            <h1 className="text-[52px] font-black leading-[0.85] mb-6 tracking-tighter text-[#1a1a1a]">
              ONE STOP SOLUTION<br />BRAND NEEDS
            </h1>
            <p className="text-[12px] text-gray-500 mb-12 leading-relaxed max-w-xs font-medium">
              LocalVendor merupakan usaha kecil menengah (UKM) yang bergerak di bidang industri jasa (KONVEKSI/GARMENT) dan pengadaan barang. Berdiri sejak 2014.
            </p>
            <div className="mt-auto flex gap-4 pt-10">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md">f</div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md">y</div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md">i</div>
            </div>
          </div>

          <div className="flex-1 bg-white m-6 rounded-[40px] relative shadow-inner flex items-center justify-center border border-gray-50 overflow-hidden">
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-1 bg-gray-100 mb-4 mx-auto rounded-full group-hover:bg-[#ff5722]"></div>
              <span className="text-gray-300 italic font-semibold text-lg tracking-widest uppercase">Portfolio Display</span>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff5722] p-5 rounded-l-[25px] shadow-xl">
              <span className="text-white font-bold text-xl">➔</span>
            </div>
            <a href="https://wa.me/6281224923591" target="_blank" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50">
              <span className="font-bold text-sm">Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;