import "./App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./Component/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
  
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
