import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/OwnerDashboard";
import SignUp from "./pages/SignUp"; // Pastikan import ini ada

const ProtectedAdmin = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  const isOwner = user?.email === "arifsetiawann62@gmail.com";
  return isOwner ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* TAMBAHKAN ROUTE SIGNUP DI SINI */}
        <Route path="/signup" element={<SignUp />} />

        <Route 
          path="/admin" 
          element={
            <ProtectedAdmin>
              <OwnerDashboard />
            </ProtectedAdmin>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;