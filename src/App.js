import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./pages/Footer";
import Register from "./pages/Register";
import Destinations from "./pages/Destinations";
import PlacePage from "./pages/PlacePage";
import Favorites from "./pages/Favorites";
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/destinations" element={<Destinations/>} />
        <Route path="/place/:title" element={<PlacePage />} />
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
