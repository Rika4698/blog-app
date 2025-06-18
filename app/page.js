'use client'

import Bloglist from "@/Components/Bloglist";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
    <ToastContainer theme="dark"/>
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    <Bloglist searchQuery={searchQuery}/>
    <Footer/>
    </>
  );
}
