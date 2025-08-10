// === ICONS (SVG Components) ===
// Ikon-ikon ini digunakan di seluruh aplikasi.
// Menggunakan komponen SVG langsung di React lebih efisien daripada file gambar.
import React, { useEffect, useState } from "react";
import ImageHero from "/public/images/hero-image.png";
import Header from "../Components/Header";
import HeroSection from "../Section/HeroSection";
import ExploreMessages from "../Section/ExploreMessages";
import SendSongForm from "../Section/SendSongForm";
import HowItWorks from "../Section/HowItWorks";
import Cta from "../Section/Cta";

// === MAIN APP COMPONENT ===
// Komponen utama yang menggabungkan semua bagian menjadi satu halaman.
const Home = () => {
    // useEffect(() => {
    //     if (window.location.hash) {
    //         const id = window.location.hash.replace("#", "");
    //         const el = document.getElementById(id);
    //         if (el) {
    //             // delay sedikit supaya konten sudah render
    //             setTimeout(() => {
    //                 el.scrollIntoView({ behavior: "smooth" });
    //             }, 100);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 100); // delay biar konten render dulu
            }
        }
    }, []);
    return (
        <div className="bg-fuchsia-100 font-sans">
            {/* <Header /> */}
            <main>
                <HeroSection />
                <SendSongForm />
                <ExploreMessages />
                <HowItWorks />
                <Cta />
            </main>
        </div>
    );
};

export default Home;
