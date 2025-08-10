import React from "react";
import MusicNoteIcon from "../Icon/MusicNoteIcon";
const Footer = () => {
    return (
        <footer className="border-t border-gray-200">
            <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-4 md:mb-0">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <MusicNoteIcon />
                        <span className="font-bold text-xl text-gray-800">
                            TitipLagu
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        &copy; {new Date().getFullYear()} TitipLagu. All rights
                        reserved.
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">
                        Data lagu disediakan oleh Spotify API
                    </p>
                    {/* Social media icons can be added here */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
