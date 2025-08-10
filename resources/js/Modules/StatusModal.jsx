import React, { useEffect, useState } from "react";
import axios from "axios";
import useSpotifyStore from "../Global/useFetchSpotify";
import SendIcon from "../Icon/SendIcon";
import SearchIcon from "../Icon/SearchIcon";
import PlayIcon from "../Icon/PlayIcon";

// --- Komponen Modal Baru ---
// Komponen ini bertanggung jawab untuk menampilkan status (loading, success, error)
const StatusModal = ({ show, type, message, onClose }) => {
    if (!show) return null;

    const modalContent = {
        loading: {
            icon: (
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-pink-600"></div>
            ),
            title: "Mengirim...",
            color: "text-gray-800",
            buttonText: null, // Tidak ada tombol saat loading
        },
        success: {
            icon: (
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>
            ),
            title: "Berhasil!",
            color: "text-green-600",
            buttonText: "Tutup",
        },
        error: {
            icon: (
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
            ),
            title: "Gagal",
            color: "text-red-600",
            buttonText: "Coba Lagi",
        },
    };

    const currentStatus = modalContent[type] || modalContent.error;

    return (
        // Overlay
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
            {/* Modal Box */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
                <div className="flex justify-center mb-4">
                    {currentStatus.icon}
                </div>
                <h3
                    className={`text-2xl font-bold mb-2 ${currentStatus.color}`}
                >
                    {currentStatus.title}
                </h3>
                <p className="text-gray-600 mb-8 px-4">{message}</p>
                {currentStatus.buttonText && (
                    <button
                        onClick={onClose}
                        className="w-full bg-pink-600 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    >
                        {currentStatus.buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default StatusModal;
