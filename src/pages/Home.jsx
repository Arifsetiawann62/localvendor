import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import PriceList from "../components/PriceList";
import * as LucideIcons from "lucide-react";
// Import Firebase
import { db } from "../firebase/config";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import Footer from "../components/Footer";
import logoImage from "../assets/logo.png";

function Home() {
  const [activeAccordion, setActiveAccordion] = useState("");
  const [page, setPage] = useState(0);
  
  // State Dinamis untuk Konten
  const [menus, setMenus] = useState([]);
  const [aboutContent, setAboutContent] = useState({ text: "", quote: "" });

  const heroSectionRef = useRef(null);
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  // Ambil Data dari Firestore secara Real-time
  useEffect(() => {
    // 1. Ambil Menu Accordion (Video Hero)
    const q = query(collection(db, "hero_content"), orderBy("order", "asc"));
    const unsubHero = onSnapshot(q, (snapshot) => {
      const heroData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenus(heroData);
      if (heroData.length > 0 && !activeAccordion) {
        setActiveAccordion(heroData[0].id); // Set default accordion pertama
      }
    });

    // 2. Ambil Konten About Us
    const unsubAbout = onSnapshot(doc(db, "settings", "about"), (doc) => {
      if (doc.exists()) setAboutContent(doc.data());
    });

    return () => {
      unsubHero();
      unsubAbout();
    };
  }, []);

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (item) => {
    if (item === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
    if (item === "About Us") scrollToSection(aboutRef);
    if (item === "Products") {
      setPage(page === 0 ? 1 : 0);
      scrollToSection(heroSectionRef);
    }
    if (item === "Gallery") scrollToSection(galleryRef);
    if (item === "Contact") scrollToSection(contactRef);
  };

  const SafeIcon = ({ name, size = 24 }) => {
    const Icon = LucideIcons[name];
    return Icon ? <Icon size={size} strokeWidth={2.5} /> : <span className="text-[10px]">!</span>;
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] font-sans text-slate-100 overflow-x-hidden relative">
      <Navbar handleNavClick={handleNavClick} />
      
      {/* HERO & PRODUCTS */}
      <div ref={heroSectionRef} className="h-screen w-full flex flex-col relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full h-full bg-[#f3f4f6]/5 backdrop-blur-md flex flex-col relative overflow-hidden">
          <div className="flex flex-1 relative z-0 pt-32">
            
            {/* SISI KIRI: ACCORDION (DINAMIS) */}
            <div className="w-[45%] p-24 flex flex-col justify-center">
              <h1 className="text-7xl font-black leading-[0.8] mb-4 uppercase tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                ONE STOP<br />SOLUTION
              </h1>
              <p className="text-slate-400 text-sm max-w-md mb-12 leading-relaxed">
                Kami hadir sebagai partner strategis untuk mewujudkan visi brand Anda melalui solusi kreatif yang terintegrasi.
              </p>
              
              <div className="space-y-8 border-t border-white/10 pt-10">
                {menus.map((item) => (
                  <div key={item.id} className="group">
                    <h2 
                      onClick={() => setActiveAccordion(item.id)} 
                      className={`text-5xl font-black uppercase italic cursor-pointer transition-all duration-500 ${activeAccordion === item.id ? "text-orange-500 translate-x-4" : "text-slate-700 hover:text-slate-500"}`}
                    >
                      {item.label}
                    </h2>
                    <AnimatePresence>
                      {activeAccordion === item.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="bg-slate-900 rounded-[40px] mt-6 relative overflow-hidden h-56 w-full shadow-2xl border border-white/10">
                            <video 
                              key={item.videoUrl} 
                              className="w-full h-full object-cover opacity-80" 
                              autoPlay muted loop playsInline
                            >
                              <source src={item.videoUrl} type="video/mp4" />
                            </video>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* SISI KANAN (Tabel Harga - Sekarang Dinamis di dalam PriceList) */}
            <PriceList page={page} setPage={setPage} />
          </div>
        </div>
      </div>

      {/* --- SECTION ABOUT US (DINAMIS) --- */}
      <div ref={aboutRef} className="min-h-screen w-full bg-[#1e1e1e] p-24 flex flex-col justify-center border-t border-white/5">
        <h2 className="text-6xl font-black text-orange-500 mb-8 italic uppercase tracking-tighter">About LocalVendor</h2>
        <div className="grid grid-cols-2 gap-20">
          <p className="text-slate-400 text-lg leading-relaxed">
            {aboutContent.text || "Loading content..."}
          </p>
          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 text-slate-500 italic shadow-2xl">
            "{aboutContent.quote || "Vision & Mission statement"}"
          </div>
        </div>
      </div>

      {/* --- SECTION GALLERY --- */}
      <div ref={galleryRef} className="min-h-screen w-full bg-[#0f172a] p-24 flex flex-col">
        <h2 className="text-6xl font-black text-white mb-12 uppercase tracking-tighter italic">Our Gallery</h2>
        <div className="grid grid-cols-3 gap-6 flex-1">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center group h-64 overflow-hidden relative">
              <span className="text-slate-700 font-black text-4xl group-hover:text-orange-500 transition-colors z-10">
                PHOTO {idx}
              </span>
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION CONTACT --- */}
      <div ref={contactRef} className="h-[70vh] w-full bg-orange-600 p-24 flex flex-col justify-center items-center text-center">
        <h2 className="text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">Let's Build Your<br />Brand Together</h2>
        <button 
          onClick={() => window.open('https://wa.me/6281224923591', '_blank')}
          className="bg-[#1e1e1e] text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl mt-10"
        >
          Contact Via WhatsApp
        </button>
      </div>

      <Footer 
        logoImage={logoImage}
        scrollToSection={scrollToSection}
        aboutRef={aboutRef}
        galleryRef={galleryRef}
        handleNavClick={handleNavClick}
      />
    </div>
  );
}

export default Home;