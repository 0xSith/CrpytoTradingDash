import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/header";
import Coins from "../components/Coins";
import Trades from "../components/Trades";
import Trading from "../components/Trading";
import "../public/css/styles.css";






  export default function HomePage() {

  useEffect(()=>{
          import("bootstrap/dist/js/bootstrap");
  },[])

  return (
    <div>
      <Header />
      <Coins />
      <Trades />
      <Trading />
    </div>
  );
}
