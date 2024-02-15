import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import CardProfile from "./components/profile";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
        }}
      >
        <Navbar />
      </div>
      <div
        style={{
          width: "100vw",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CardProfile />
      </div>
    </>
  );
}

export default App;
