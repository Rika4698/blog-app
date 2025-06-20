'use client'

import Bloglist from "@/Components/Bloglist";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import HowWorkSection from "@/Components/HowWorkSection";
import ProjectAchievements from "@/Components/ProjectAchievements";
import UpcomingCatagory from "@/Components/UpcomingCatagory";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
       
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1800);
        return () => clearTimeout(timer);
      }, []);

  return (
    <>
    {isLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-white ">
        <Image className="w-20 h-20 animate-spin" src={"https://www.svgrepo.com/show/448500/loading.svg"} width={40} height={40} alt="Loading icon"/>
    </div>
      ) : (<>
    <ToastContainer theme="dark"/>
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    <Bloglist searchQuery={searchQuery}/>
    <UpcomingCatagory></UpcomingCatagory>
    <HowWorkSection/>
    <ProjectAchievements/>
    <Footer/>
    </>)}
    </>
  );
}
