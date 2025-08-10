import React, { useEffect, useState } from "react";
import axios from "axios";
import useSpotifyStore from "../Global/useFetchSpotify";
import SendIcon from "../Icon/SendIcon";
import SearchIcon from "../Icon/SearchIcon";
import PlayIcon from "../Icon/PlayIcon";

export default function SendSongForm() {
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [isPublic, setIsPublic] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const MAX_CHARS = 200;
    const {
        query,
        setQuery,
        results,
        loading,
        error,
        // playPreview,
        // pausePreview,
        // playingId,
        selectTrack,
    } = useSpotifyStore();

    const handleSelectTrack = (track) => {
        setSelectedTrack(track);
        selectTrack(track);
    };

    const handleClearSelection = () => {
        setSelectedTrack(null);
        selectTrack(null); // clear store selection
        setQuery(""); // allow searching again
    };

    // Tampilkan modal loading

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recipient?.trim() || !message?.trim() || !selectedTrack) {
            alert("Harap lengkapi semua data dan pilih lagu!");
            return;
        }

        // Build payload object untuk 'lagu' sesuai yang kamu pakai di Thunder Client
        const laguPayload = {
            track_id: selectedTrack.id,
            title: selectedTrack.title ?? null,
            artist: selectedTrack.artist ?? null,
            image: selectedTrack.image ?? null,
            preview_url: selectedTrack.preview_url ?? null,
        };

        try {
            setLoadingSubmit(true);

            // ganti base URL jika perlu: 'http://localhost:8000/api/messages'
            await axios.post("/api/messages", {
                nama: recipient.trim(),
                pesan: message.trim(),
                lagu: laguPayload, // KIRIM OBJECT (bukan string id)
                is_active: true,
            });

            // setelah berhasil:
            setRecipient("");
            setMessage("");
            setSelectedTrack(null);

            // HAPUS selection di zustand store supaya setQuery("") bisa membersihkan results
            selectTrack(null);

            // lalu kosongkan query (ini akan memicu logic di setQuery)
            setQuery("");
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <section id="kirim" className="bg-white  py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Kirim Lagu Spesialmu
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Cari lagu, tulis pesan, dan buat momen spesial untuk
                        seseorang
                    </p>
                </div>

                <div className="max-w-2xl mx-auto  p-8 rounded-xl shadow-xl shadow-gray-300 border-2 border-gray-200 ">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Pencarian Lagu */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cari Lagu{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    type="text"
                                    placeholder="Cari judul lagu atau artis..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>
                            {loading && (
                                <p className="text-sm text-gray-500 mt-1 ml-2">
                                    Loading...
                                </p>
                            )}
                            {error && (
                                <p className="text-sm text-red-500 mt-1 ml-2">
                                    {error}
                                </p>
                            )}
                            {selectedTrack ? (
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                    <div className="flex items-center gap-3">
                                        {selectedTrack.image ? (
                                            <img
                                                src={selectedTrack.image}
                                                alt={selectedTrack.title}
                                                className="w-12 h-12 rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200" />
                                        )}
                                        <div>
                                            <div className="font-medium">
                                                {selectedTrack.title}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {selectedTrack.artist}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={handleClearSelection}
                                            className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <ul className="mt-3 divide-y divide-gray-200">
                                    {results.map((t) => (
                                        <li
                                            key={t.id}
                                            className="flex items-center justify-between py-2"
                                        >
                                            <div className="flex items-center gap-3">
                                                {t.image ? (
                                                    <img
                                                        src={t.image}
                                                        alt="cover"
                                                        className="w-12 h-12 rounded"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200" />
                                                )}
                                                <div>
                                                    <div className="font-medium">
                                                        {t.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {t.artist}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {t.preview_url ? (
                                                    playingId === t.id ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                pausePreview()
                                                            }
                                                            className="text-sm text-pink-600"
                                                        >
                                                            Pause
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                playPreview(t)
                                                            }
                                                            className="text-sm text-pink-600 flex items-center gap-1"
                                                        >
                                                            <PlayIcon className="w-4 h-4" />{" "}
                                                            Play
                                                        </button>
                                                    )
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        No preview
                                                    </span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleSelectTrack(t)
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-lg ${
                                                        selectedTrack?.id ===
                                                        t.id
                                                            ? "bg-pink-600 text-white"
                                                            : "bg-gray-100 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    Pilih
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Nama Penerima */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Penerima{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama penerima"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </div>

                        {/* Pesan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pesan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Tulis pesanmu di sini..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={MAX_CHARS}
                            ></textarea>
                            <p className="text-right text-sm text-gray-500 mt-1">
                                {message.length}/{MAX_CHARS}
                            </p>
                        </div>

                        {/* Submit */}
                        <div>
                            {/* <button
                                type="submit"
                                disabled={loadingSubmit}
                                className="w-full bg-pink-600 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loadingSubmit ? (
                                    "Mengirim..."
                                ) : (
                                    <>
                                        Kirim Lagu{" "}
                                        <SendIcon className="w-5 h-5" />
                                    </>
                                )}
                            </button> */}
                            <button
                                type="submit"
                                disabled={loadingSubmit}
                                className="w-full bg-pink-600 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                Kirim Lagu <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
