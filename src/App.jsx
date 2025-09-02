import { useState } from "react";
import "./App.css";
import { DarkModeProvider } from "./components/DarkModeContext";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import ExclusiveOffer from "./pages/Exclusiveoffer";
import Product from "./pages/product";

function App() {
  

  return (
    <DarkModeProvider>
      <Header />
  <Home/>
  <Product/>
 <ExclusiveOffer/>
 <Signup />
 <Login />
      <Footer />
    </DarkModeProvider>
  );
}

export default App;
