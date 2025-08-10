import React from "react";
import ImageHero from "/public/images/hero-image.png";

const HeroSection = () => {
    return (
        <section className="container mx-auto px-6 py-16 md:py-24 mt-15">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                        Kirim Lagu, Sampaikan{" "}
                        <span className="text-pink-600">Rasa</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Ungkapkan perasaanmu melalui lagu. Kirim lagu favoritmu
                        beserta pesan spesial untuk orang yang kamu sayangi.
                    </p>
                    <a
                        href="#kirim"
                        className="mt-8 inline-block bg-pink-600 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
                    >
                        Kirim Sekarang &rarr;
                    </a>
                </div>
                <div className="md:w-1/2">
                    <img
                        src={ImageHero}
                        alt="Person listening to music"
                        className="w-full max-w-md mx-auto my-5"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/600x400/f9f5ff/a855f7?text=Ilustrasi";
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
