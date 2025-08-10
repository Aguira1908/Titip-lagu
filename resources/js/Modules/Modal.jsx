import { CircleX } from "lucide-react";

const Modal = ({ isOpen, onClose, event }) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-filter backdrop-blur-sm ">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {event.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <CircleX />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">
                    <p className="text-gray-600">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">
                                Tanggal
                            </label>
                            <p className="text-gray-900">
                                {new Date(event.date).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">
                                Waktu
                            </label>
                            <p className="text-gray-900">
                                {event.start_time} - {event.end_time}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">
                                Lokasi
                            </label>
                            <p className="text-gray-900">{event.location}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">
                                Dresscode
                            </label>
                            <p className="text-gray-900">{event.dresscode}</p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
