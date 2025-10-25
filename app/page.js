'use client'
import { useEffect, useState } from "react";
import About from "../components/About";
import AdvancedContact from "../components/AdvancedContact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import AdvancedWorkShowcase from "../components/AdvancedWorkShowcase";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import AIChatbot from "../components/AIChatbot";
import PWAManager from "../components/PWAManager";
import ParticleBackground from "../components/ParticleBackground";
import CursorTrail from "../components/CursorTrail";
import Scene3D from "../components/Scene3D";
import CodePlayground from "../components/CodePlayground";

export default function Home() {
  // Test compilation
  const [isDarkMode, setIsDarkMode] = useState(false);

 useEffect(()=>{
  if (typeof window !== 'undefined') {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
    }else{
      setIsDarkMode(false)
    }
  }
 },[])

 useEffect(()=>{
    if(typeof window !== 'undefined') {
      if(isDarkMode){
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }else{
        document.documentElement.classList.remove('dark');
        localStorage.theme = '';
      }
    }
 },[isDarkMode])

  return (
    <>
    <Scene3D isDarkMode={isDarkMode} />
    <ParticleBackground isDarkMode={isDarkMode} />
    <CursorTrail isDarkMode={isDarkMode} />
    <div className="relative z-20">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <AdvancedWorkShowcase isDarkMode={isDarkMode} />
      <CodePlayground isDarkMode={isDarkMode} />
      <AnalyticsDashboard isDarkMode={isDarkMode} />
      <AdvancedContact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
    <AIChatbot isDarkMode={isDarkMode} />
    <PWAManager />
    </>
  );
}
