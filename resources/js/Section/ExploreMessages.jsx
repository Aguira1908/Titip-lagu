import React, { useEffect } from "react";
import PlayIcon from "../Icon/PlayIcon";
import useFetchMessage from "../Global/useFetchMessage";
import SpotifyIcon from "/public/images/spotify.png"; // Adjust the path as necessary

const ExploreMessages = () => {
    const { contentData, isLoading, error, fetchMessage } = useFetchMessage();

    useEffect(() => {
        fetchMessage();
    }, []);

    return (
        <section id="jelajahi" className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Jelajahi Pesan
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                        Lihat pesan-pesan yang dikirim oleh pengguna lain.
                        Mungkin ada inspirasi untuk pesanmu berikutnya.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentData.slice(0, 3).map((item, index) => (
                        <a
                            href={`/jelajahi-pesan/${item.id}`}
                            key={index}
                            className=""
                        >
                            <div className="bg-white w-full max-w-sm mx-auto  min-h-[220px] flex flex-col justify-between group hover:bg-gray-100 transition-colors duration-200 p-6 rounded-xl shadow-lg space-y-4">
                                <div className="flex items-center  justify-between  rounded-lg ">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.lagu?.image}
                                                alt={"Cover Lagu"}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <p className="font-bold text-gray-800">
                                                {item.lagu?.title || ""}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {item.lagu?.artist || ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={SpotifyIcon} alt="Sd" />
                                    </div>
                                </div>
                                <p className="text-gray-700 font-['Gloria_Hallelujah'] line-clamp-3">
                                    {item.pesan}
                                </p>
                                <div className="flex w-full justify-between items-center text-sm text-gray-500 pt-4 border-t-2 border-gray-300">
                                    <span className="w-full flex gap-2">
                                        Untuk:{"   "}
                                        <span className="font-['Gloria_Hallelujah']  font-semibold text-gray-700 line-clamp-3">
                                            {item.nama}
                                        </span>
                                    </span>
                                    <span className="w-full text-right">
                                        {new Date(
                                            item.created_at
                                        ).toLocaleString("id-ID", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a
                        href="/jelajahi-pesan"
                        className="bg-white border-2 border-pink-600 hover:border-pink-700 text-pink-600 hover:text-pink-700 font-bold rounded-full px-8 py-3 hover:bg-pink-50 transition-colors duration-300"
                    >
                        Lihat Lebih Banyak
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ExploreMessages;
