import React, { useEffect, useRef, useState, useCallback } from "react";
import useFetchMessage from "../Global/useFetchMessage";
import SpotifyIcon from "/public/images/spotify.png"; // Adjust the path as necessary
import { MessageCircleX } from "lucide-react";

const Browse = () => {
    const {
        contentData,
        fetchMessage,
        isLoading,
        error,
        currentPage,
        hasMore,
    } = useFetchMessage();
    const [searchName, setSearchName] = useState("");

    const observer = useRef();

    useEffect(() => {
        fetchMessage({ page: 1 });
    }, []);

    const lastItemRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchMessage({
                        page: currentPage + 1,
                        append: true,
                        namaQuery: searchName,
                    });
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore, currentPage, searchName]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMessage({ page: 1, namaQuery: searchName });
    };

    return (
        <div className="bg-fuchsia-50 font-sans min-h-[100vh]">
            <main>
                <section className="container mx-auto max-w-3xl px-6 py-16 md:py-24">
                    <div className="flex flex-col w-full max-w-sm md:max-w-2xl mx-auto  items-center gap-5">
                        <div className="w-full text-center text-md">
                            <h1 className="text-5xl font-bold mb-5">
                                Jelajahi Pesan
                            </h1>
                            <h2>Temukan lebih banyak ungkapan perasaan</h2>
                        </div>
                        <form
                            className="w-full flex  gap-4  "
                            onSubmit={handleSubmit}
                        >
                            <input
                                className="w-full p-4 text-md rounded-xl border-2 border-gray-300 transition-all duration-200"
                                type="text"
                                placeholder="Masukkan nama penerima..."
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="inline-block bg-pink-600 text-white font-bold rounded-2xl px-8 py-3 hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </section>

                <section className="container mx-auto max-w-3xl pb-20">
                    <div className="flex flex-col md:grid md:grid-cols-2  gap-5">
                        {contentData.length ? (
                            contentData.map((item, index) => {
                                const isLast = index === contentData.length - 1;
                                return (
                                    <a
                                        href={`/jelajahi-pesan/${item.id}`}
                                        key={index}
                                        ref={isLast ? lastItemRef : null}
                                        className=""
                                    >
                                        <div className="bg-white w-full max-w-sm mx-auto  min-h-[250px] flex flex-col justify-between group hover:bg-gray-100 transition-colors duration-200 p-6 rounded-xl shadow-lg space-y-4">
                                            <div className="flex items-center  justify-between  rounded-lg ">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={
                                                                item.lagu?.image
                                                            }
                                                            alt={"Cover Lagu"}
                                                            className="w-16 h-16 rounded-lg object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-3">
                                                        <p className="font-bold text-gray-800">
                                                            {item.lagu?.title ||
                                                                ""}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {item.lagu
                                                                ?.artist || ""}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img
                                                        src={SpotifyIcon}
                                                        alt="Sd"
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-gray-700 italic">
                                                {item.pesan}
                                            </p>
                                            <div className="flex w-full justify-between items-center text-sm text-gray-500 pt-4 border-t-2 border-gray-300">
                                                <span className="w-full flex gap-2">
                                                    Untuk:{"   "}
                                                    <span className="font-semibold text-gray-700 line-clamp-3">
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
                                );
                            })
                        ) : (
                            <div className="w-full col-span-2 px-5 py-10 rounded-2xl  flex flex-col items-center  bg-white shadow-2xl shadow-gray-300">
                                <MessageCircleX className="w-12 h-12 text-gray-400" />
                                <p className="text-center text-gray-500 mt-4">
                                    Tidak ada pesan ditemukan.
                                </p>
                            </div>
                        )}
                    </div>
                    {isLoading && (
                        <div className="text-center py-5 text-gray-500">
                            Loading...
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Browse;
