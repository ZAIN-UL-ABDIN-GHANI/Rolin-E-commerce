import { useState } from "react";
import "./App.css";
import { DarkModeProvider } from "./components/DarkModeContext";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Testimonials from "./components/Testimonials";
function App() {
  

  return (
    <DarkModeProvider>
      <Header />
  <Home/>
  <Testimonials />
      <Footer />
    </DarkModeProvider>
  );
}

export default App;
