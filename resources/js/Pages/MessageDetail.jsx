import axios from "axios";
import React, { useEffect, useState } from "react";
import { SanitizeData } from "../Global/useSanitizeData";
import notFoundImage from "/public/images/browser.png";

const MessageDetail = ({ id }) => {
    const [isValidID, setIsValidID] = useState(false);
    const [messageData, setMessageData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Simulate fetching message data based on ID
    useEffect(() => {
        if (!id || isNaN(id)) {
            setIsValidID(false);
            return;
        }
        setIsValidID(true);

        const fetchMessageData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/messages/byname/${id}`);
                const sanitizedData = SanitizeData(response?.data || {});
                setMessageData(sanitizedData);
            } catch (error) {
                console.error("Error fetching message data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessageData();
    }, [id]);

    return (
        <main className="min-h-screen bg-fuchsia-50 flex items-center justify-center">
            <section className="container mx-auto px-6 py-16 md:py-24">
                {isLoading ? (
                    // LOADING SPINNER
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-pink-600 font-medium">
                            Memuat pesan...
                        </p>
                    </div>
                ) : !isValidID || !messageData ? (
                    <div className="flex flex-col items-center gap-8">
                        <h1 className="text-3xl ">
                            Pesan Tidak
                            <span className="text-pink-700 ml-2 font-bold font-['Gloria_Hallelujah']">
                                Ditemukan
                            </span>
                            .
                        </h1>
                        <img
                            className="w-20 h-auto"
                            src={notFoundImage}
                            alt="Not Found"
                            loading="lazy"
                        />
                        <a
                            href="/jelajahi-pesan"
                            className="mt-8 inline-flex items-center justify-center gap-2 bg-pink-600 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
                        >
                            Kirim Lagu Sekarang
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-5 items-center px-20 py-10">
                            <h1 className=" text-3xl ">
                                Hai,
                                <span className="font-['Gloria_Hallelujah'] ml-3">
                                    {messageData?.nama ||
                                        "Pengirim Tidak Diketahui"}
                                </span>
                            </h1>
                            <p className="text-md">
                                Seseorang menitipkan lagu untukmu. Mari
                                dengarkan dan rasakan pesannya 💌
                            </p>
                        </div>
                        <div className="w-full max-w-lg aspect-video rounded-xl overflow-hidden ">
                            <iframe
                                src={`https://open.spotify.com/embed/track/${messageData.lagu?.track_id}?utm_source=generator`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </div>
                        {/* Pesan */}
                        <div className="flex flex-col w-full h-auto gap-5 items-center px-6 md:px-20">
                            <h2 className="text-xl">Pesan untukmu</h2>
                            <p className="mt-3 text-gray-700 leading-relaxed text-3xl font-['Gloria_Hallelujah']  text-center whitespace-pre-line">
                                {messageData?.pesan ||
                                    "Tidak ada pesan yang dititipkan."}
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default MessageDetail;
