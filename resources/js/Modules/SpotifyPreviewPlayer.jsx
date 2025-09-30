// components/SpotifyPreviewPlayer.jsx
import React, { useState } from 'react';
import PlayIcon from '../Icon/PlayIcon';

export default function SpotifyPreviewPlayer({ trackId, previewUrl }) {
  const [showEmbed, setShowEmbed] = useState(false);

  if (previewUrl) {
    // Kalau ada preview_url → pakai <audio>
    return (
      <audio controls src={previewUrl} className="h-8">
        Your browser does not support audio.
      </audio>
    );
  }

  // Kalau gak ada preview_url → render tombol kecil untuk buka embed
  return (
    <>
      {showEmbed ? (
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="250"
          height="80"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          className="rounded"
        ></iframe>
      ) : (
        <button
          onClick={() => setShowEmbed(true)}
          className="text-sm text-pink-600 flex items-center gap-1"
        >
          <PlayIcon className="w-4 h-4" /> Preview
        </button>
      )}
    </>
  );
}
