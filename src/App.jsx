import { useState } from "react";
import "./App.css";
import { DarkModeProvider } from "./components/DarkModeContext";
import Header from "./components/Header";

import Footer from "./components/Footer";
import Home from "./pages/Home/Home";

import ExclusiveOffer from "./pages/product/Exclusiveoffer";
import Product from "./pages/product/Product";
import Contact from "./pages/contact/Contact";

function App() {
  

  return (
    <DarkModeProvider>
      <Header />
  <Home/>
  <Product/>
 <ExclusiveOffer/>
 <Contact/>
      <Footer />
    </DarkModeProvider>
  );
}

export default App;
