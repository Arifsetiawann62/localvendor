import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase/config";
import { createOrder } from "../firebase/db";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const PriceList = ({ page, setPage }) => {
  const [products, setProducts] = useState([]);

  // Ambil data produk secara Real-time dari Firestore
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prodArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(prodArray);
    });
    return () => unsubscribe();
  }, []);

  const handleInstantOrder = async (productName, price) => {
    const user = auth.currentUser;
    let guestInfo = null;

    if (!user) {
      const wa = prompt(
        "Masukkan nomor WhatsApp Anda (Angka saja, contoh: 62812...):",
      );
      if (!wa) return;

      const isOnlyNumbers = /^\d+$/.test(wa);
      if (!isOnlyNumbers) {
        alert("Input tidak valid! Gunakan angka saja.");
        return;
      }

      guestInfo = { whatsapp: wa, name: "Guest User", type: "Guest" };
    }

    const cartItems = [
      {
        name: productName,
        price: price,
        category: page === 0 ? "Retail" : "Corporate",
      },
    ];

    try {
      const orderId = await createOrder(user?.uid, cartItems, guestInfo);
      alert(`Pesanan ${productName} berhasil!\nID: ${orderId}`);
    } catch (err) {
      alert("Gagal mengirim pesanan.");
      console.error(err);
    }
  };

  // Filter produk berdasarkan tab (Retail = 0, Corporate = 1)
  const filteredProducts = products.filter((p) =>
    page === 0 ? p.category === "Retail" : p.category === "Corporate",
  );

  return (
    <div className="flex-1 relative m-12 mt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-[80px] blur-3xl"></div>
      <div className="relative h-full bg-white/5 backdrop-blur-2xl rounded-[80px] border border-white/10 shadow-inner overflow-hidden flex flex-col p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="h-full flex flex-col"
          >
            <div className="mb-6 relative">
              <h3 className="text-white/5 font-black text-7xl uppercase absolute -top-4 -left-2 select-none">
                {page === 0 ? "RETAIL" : "CORP"}
              </h3>
              <p className="text-orange-500 font-black text-2xl tracking-[0.3em] uppercase relative z-10 italic">
                {page === 0
                  ? "Clothing Brand Price List"
                  : "Corporate Service Price List"}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 text-xs font-black uppercase text-white">
                      Produk
                    </th>
                    <th className="py-3 text-xs font-black uppercase text-orange-500 text-center">
                      Price
                    </th>
                    <th className="py-3 text-xs font-black uppercase text-orange-500 text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 text-[13px]">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4">
                          <b className="text-white">{product.name}</b>
                        </td>
                        <td className="text-center font-bold text-white">
                          {product.price / 1000}k
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              handleInstantOrder(product.name, product.price)
                            }
                            className="bg-orange-500/20 hover:bg-orange-500 text-orange-500 hover:text-white px-4 py-1 rounded-full border border-orange-500/50 transition-all text-[10px] font-bold uppercase"
                          >
                            Order
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-10 text-center italic text-slate-500"
                      >
                        Belum ada produk untuk kategori ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPage(page === 0 ? 1 : 0)}
          className="mt-6 w-full py-4 bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl text-white font-black text-xs uppercase tracking-[0.2em]"
        >
          {page === 0 ? "Switch to Corporate" : "Switch to Clothing"}
        </motion.button>
      </div>
    </div>
  );
};

export default PriceList;
