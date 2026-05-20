import React from "react";

const Footer = ({
  logoImage,
  scrollToSection,
  aboutRef,
  galleryRef,
  handleNavClick,
}) => {
  return (
    <footer className="bg-[#0a0f1d] py-20 px-24 border-t border-white/5 relative z-10">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div className="col-span-2">
          {logoImage ? (
            <img
              src={logoImage}
              alt="LocalVendor"
              className="h-8 w-auto brightness-200 mb-8"
            />
          ) : (
            <h2 className="text-2xl font-black text-white italic uppercase mb-8">
              Local<span className="text-orange-500">Vendor</span>
            </h2>
          )}
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            Partner produksi garment terpercaya berbasis di Bandung. Fokus pada
            kualitas material premium dan ketepatan waktu untuk solusi satu
            pintu kebutuhan brand Anda.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Sitemap
          </h4>
          <ul className="text-slate-500 text-sm space-y-4">
            <li
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-orange-500 cursor-pointer transition-colors"
            >
              Home
            </li>
            <li
              onClick={() => scrollToSection(aboutRef)}
              className="hover:text-orange-500 cursor-pointer transition-colors"
            >
              About Us
            </li>
            <li
              onClick={() => handleNavClick("Products")}
              className="hover:text-orange-500 cursor-pointer transition-colors"
            >
              Products
            </li>
            <li
              onClick={() => scrollToSection(galleryRef)}
              className="hover:text-orange-500 cursor-pointer transition-colors"
            >
              Gallery
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Connect
          </h4>
          <ul className="text-slate-500 text-sm space-y-4">
            <li className="hover:text-white cursor-pointer transition-colors">
              WhatsApp
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Instagram
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              LinkedIn
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Email
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          © 2026 LocalVendor Bandung. Crafted for Excellence.
        </p>
        <div className="flex gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
