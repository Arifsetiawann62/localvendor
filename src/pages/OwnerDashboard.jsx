import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]); // State untuk data customer
  const [videoUrl, setVideoUrl] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Retail",
  });

  useEffect(() => {
    // 1. Listener Orders
    const qOrders = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
    );
    const unsubOrders = onSnapshot(qOrders, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // 2. Listener Products
    const qProds = query(
      collection(db, "products"),
      orderBy("category", "asc"),
    );
    const unsubProds = onSnapshot(qProds, (snap) => {
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // 3. Listener Users (Customer Accounts)
    const qUsers = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubUsers = onSnapshot(qUsers, (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // 4. Get Video Settings
    const unsubVideo = onSnapshot(doc(db, "settings", "appearance"), (doc) => {
      if (doc.exists()) setVideoUrl(doc.data().heroVideo);
    });

    return () => {
      unsubOrders();
      unsubProds();
      unsubVideo();
      unsubUsers();
    };
  }, []);

  // --- FUNGSI HAPUS PESANAN ---
  const deleteOrder = async (orderId) => {
    if (window.confirm("Hapus pesanan ini secara permanen?")) {
      try {
        await deleteDoc(doc(db, "orders", orderId));
      } catch (err) {
        console.error("Error deleting order:", err);
      }
    }
  };

  // --- FUNGSI HAPUS CUSTOMER ---
  const deleteUser = async (userId) => {
    if (
      window.confirm(
        "Hapus akun customer ini? Data profil mereka akan hilang dari database.",
      )
    ) {
      try {
        await deleteDoc(doc(db, "users", userId));
        alert("Akun berhasil dihapus.");
      } catch (err) {
        alert("Gagal menghapus: " + err.message);
      }
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Harap isi nama produk dan harga!");
      return;
    }
    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: Number(newProduct.price),
        createdAt: serverTimestamp(),
      });
      alert("Produk berhasil ditambahkan!");
      setNewProduct({ name: "", price: "", category: "Retail" });
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  const updateVideo = async () => {
    await setDoc(
      doc(db, "settings", "appearance"),
      { heroVideo: videoUrl },
      { merge: true },
    );
    alert("Video Updated!");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-10 pt-40 text-white font-sans">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER & TAB NAVIGATION */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-orange-500 italic uppercase tracking-tighter">
            Control Center
          </h1>
          <div className="flex gap-4 bg-white/5 p-2 rounded-full border border-white/10">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "orders" ? "bg-orange-500 shadow-lg" : "text-slate-400"}`}
            >
              ORDERS
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "customers" ? "bg-orange-500 shadow-lg" : "text-slate-400"}`}
            >
              CUSTOMERS
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "settings" ? "bg-orange-500 shadow-lg" : "text-slate-400"}`}
            >
              CONTENT
            </button>
          </div>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 p-6 rounded-[30px] flex justify-between items-center group hover:border-orange-500/30 transition-all"
              >
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    {order.items?.[0]?.name || "Produk"}
                  </h3>
                  <p className="text-slate-500 text-[10px] font-bold mt-1">
                    WA:{" "}
                    <span className="text-slate-300">
                      {order.customerInfo?.whatsapp}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${order.customerInfo?.whatsapp}`,
                      )
                    }
                    className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all border border-white/10"
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all border border-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CUSTOMERS (WITH DELETE FEATURE) */}
        {activeTab === "customers" && (
          <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 text-[10px] font-black uppercase text-orange-500 tracking-widest">
                      Name / Email
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-orange-500 tracking-widest">
                      WhatsApp
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-orange-500 tracking-widest text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-all"
                    >
                      <td className="p-6">
                        <p className="font-bold text-white text-sm">
                          {u.displayName || "No Name"}
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold">
                          {u.email}
                        </p>
                      </td>
                      <td className="p-6 text-slate-300 font-mono text-xs">
                        {u.whatsapp || "No Contact"}
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              window.open(
                                `https://wa.me/${u.whatsapp}`,
                                "_blank",
                              )
                            }
                            className="bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all"
                          >
                            Contact
                          </button>
                          {/* TOMBOL DELETE CUSTOMER */}
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all"
                          >
                            Delete Account
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS & PRODUCT MGMT */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
              <h2 className="text-xl font-black mb-6 uppercase text-orange-500 italic">
                Video Hero
              </h2>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Link Video"
                className="w-full bg-white/10 p-4 rounded-2xl mb-4 text-sm outline-none border border-white/5"
              />
              <button
                onClick={updateVideo}
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-[11px] uppercase italic tracking-widest hover:bg-orange-500 hover:text-white transition-all"
              >
                Save Configuration
              </button>
            </div>

            <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
              <h2 className="text-xl font-black mb-6 uppercase text-orange-500 italic tracking-tighter">
                Price Management
              </h2>
              <form onSubmit={addProduct} className="space-y-3 mb-8">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full bg-white/10 p-4 rounded-2xl text-sm outline-none border border-white/5"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  value={newProduct.name}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full bg-white/10 p-4 rounded-2xl text-sm outline-none border border-white/5"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  value={newProduct.price}
                />
                <select
                  className="w-full bg-slate-800 p-4 rounded-2xl text-sm outline-none border border-white/5 mb-4"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option value="Retail">Retail (Clothing)</option>
                  <option value="Corporate">Corporate (Service)</option>
                </select>
                <button className="w-full bg-orange-500 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20">
                  Add New Item
                </button>
              </form>
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-center bg-white/5 p-4 rounded-2xl text-xs border border-white/5 hover:border-orange-500/30 transition-all"
                  >
                    <span className="font-bold text-slate-300">
                      {p.name} -{" "}
                      <span className="text-orange-500">
                        Rp{p.price.toLocaleString()}
                      </span>
                    </span>
                    <button
                      onClick={() => deleteDoc(doc(db, "products", p.id))}
                      className="text-red-500 font-bold uppercase text-[9px] hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
