import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createOrder = async (userId, cartItems, customerInfo = null) => {
  try {
    // Validasi sederhana: jangan kirim kalau keranjang kosong
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Keranjang belanja kosong!");
    }

    const orderData = {
      userId: userId || null,
      items: cartItems,
      status: "pending",
      total: cartItems.reduce((acc, item) => acc + (item.price || 0), 0),
      customerInfo: customerInfo,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("Pesanan berhasil dikirim dengan ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    // Ini akan memunculkan detail error di Console F12
    console.error("Detail Error Firebase:", error.code, error.message);
    throw error;
  }
};