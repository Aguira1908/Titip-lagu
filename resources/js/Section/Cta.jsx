import React from "react";
import MusicNoteIcon from "../Icon/MusicNoteIcon";

const Cta = () => {
    return (
        <section className="py-16 md:py-24 ">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Siap Mengirim Lagu Spesialmu?
                </h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                    Ungkapkan perasaanmu melalui lagu dan buat momen spesial
                    untuk orang yang kamu sayangi.
                </p>
                <a
                    href="#kirim"
                    className="mt-8 inline-flex items-center justify-center gap-2 bg-pink-600 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
                >
                    Kirim Lagu Sekarang <MusicNoteIcon />
                </a>
            </div>
        </section>
    );
};
export default Cta;
