import {Outlet} from "react-router-dom";
import React from "react";
import Style from "./LayOut.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";


export default function LayOut() {
  return <div>
    <Navbar/>
    <Outlet/>
  </div>;
}
