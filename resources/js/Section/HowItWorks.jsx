import React from "react";
import EditIcon from "../Icon/EditIcon";
import SendIcon from "../Icon/SendIcon";
import SearchIcon from "../Icon/SearchIcon";

const HowItWorks = () => {
    const steps = [
        {
            icon: <SearchIcon className="w-8 h-8 text-pink-600" />,
            title: "Cari Lagu",
            description:
                "Temukan lagu yang ingin kamu kirimkan melalui pencarian.",
        },
        {
            icon: <EditIcon className="w-8 h-8 text-pink-600" />,
            title: "Tulis Pesan",
            description: "Tambahkan pesan spesial untuk penerima lagu.",
        },
        {
            icon: <SendIcon className="w-8 h-8 text-pink-600" />,
            title: "Kirim",
            description: "Kirimkan lagu dan buat momen spesial bagi seseorang.",
        },
    ];

    return (
        <section id="how-it-works" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Cara Kerjanya
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Kirim lagu favoritmu dalam 3 langkah mudah
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
