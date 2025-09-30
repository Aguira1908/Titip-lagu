import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSpotifyStore from '../Global/useFetchSpotify';
import SendIcon from '../Icon/SendIcon';
import SearchIcon from '../Icon/SearchIcon';
import ExternalLinkIcon from '../Modules/ExternalLinkIcon'; // You'll need this new icon
import { Link, Send } from 'lucide-react';

export default function SendSongForm() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const MAX_CHARS = 200;
  const { query, setQuery, results, loading, error, selectTrack } =
    useSpotifyStore();

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
    selectTrack(track);
  };

  const handleClearSelection = () => {
    setSelectedTrack(null);
    selectTrack(null);
    setQuery('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipient?.trim() || !message?.trim() || !selectedTrack) {
      alert('Harap lengkapi semua data dan pilih lagu!');
      return;
    }

    // Build payload object
    const laguPayload = {
      track_id: selectedTrack.id,
      title: selectedTrack.title ?? null,
      artist: selectedTrack.artist ?? null,
      image: selectedTrack.image ?? null,
      external_url: selectedTrack.external_urls?.spotify ?? null, // Update this line
    };

    try {
      setLoadingSubmit(true);

      await axios.post('/api/messages', {
        nama: recipient.trim(),
        pesan: message.trim(),
        lagu: laguPayload,
        is_active: true,
      });

      // Reset form after successful submission
      setRecipient('');
      setMessage('');
      setSelectedTrack(null);
      selectTrack(null);
      setQuery('');
    } catch (err) {
      console.error(err);
      alert('Terjadi error saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <section id="kirim" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Kirim Lagu Spesialmu
          </h2>
          <p className="mt-2 text-gray-600">
            Cari lagu, tulis pesan, dan buat momen spesial untuk seseorang
          </p>
        </div>

        <div className="max-w-2xl mx-auto p-8 rounded-xl shadow-xl shadow-gray-300 border-2 border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Pencarian Lagu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cari Lagu <span className="text-red-500">*</span>
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
                <p className="text-sm text-gray-500 mt-1 ml-2">Loading...</p>
              )}
              {error && (
                <p className="text-sm text-red-500 mt-1 ml-2">{error}</p>
              )}
              {selectedTrack ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded mt-3">
                  <div className="flex items-center gap-3">
                    {selectedTrack.image ? (
                      <img
                        src={selectedTrack.image}
                        alt={selectedTrack.title}
                        className="w-12 h-12 rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded" />
                    )}
                    <div>
                      <div className="font-medium">{selectedTrack.title}</div>
                      <div className="text-sm text-gray-500">
                        {selectedTrack.artist}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedTrack.external_urls?.spotify && (
                      <a
                        href={selectedTrack.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                      >
                        <ExternalLinkIcon className="w-4 h-4" />
                        Buka di Spotify
                      </a>
                    )}
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
                <ul className="mt-3 divide-y divide-gray-200 max-h-80 overflow-y-auto">
                  {results.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded"
                    >
                      <div className="flex items-center gap-3">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt="cover"
                            className="w-12 h-12 rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{t.title}</div>
                          <div className="text-sm text-gray-500 truncate">
                            {t.artist}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {t.external_urls?.spotify && (
                          <a
                            href={t.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                          >
                            <Link className="w-4 h-4" />
                            Buka
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSelectTrack(t)}
                          className={`px-3 py-1 text-sm rounded-lg ${
                            selectedTrack?.id === t.id
                              ? 'bg-pink-600 text-white'
                              : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
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
                Nama Penerima <span className="text-red-500">*</span>
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
              <button
                type="submit"
                disabled={loadingSubmit}
                className="w-full bg-pink-600 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loadingSubmit ? (
                  'Mengirim...'
                ) : (
                  <>
                    Kirim Lagu <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
