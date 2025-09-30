import { create } from 'zustand';
import axios from 'axios';

const useSpotifyStore = create((set, get) => {
  // closure vars (tidak diserialisasi ke state)
  let debounceTimer = null;
  let audio = null;

  const normalize = (resData) => {
    // Kalau backend sudah mengembalikan array yang sudah dimap (id,title,artist,image,preview_url)
    if (Array.isArray(resData)) return resData;

    // Kalau backend mengembalikan object spotify asli -> tracks.items
    if (resData?.tracks?.items) {
      return resData.tracks.items.map((t) => ({
        id: t.id,
        title: t.name,
        artist: (t.artists || []).map((a) => a.name).join(', '),
        image: t.album?.images?.[0]?.url ?? null,
        preview_url: t.preview_url ?? null,
        raw: t, // keep raw payload if perlu
      }));
    }

    // fallback: kalau ada .items
    if (resData?.items) return resData.items;

    return [];
  };

  return {
    // state
    query: '',
    results: [],
    loading: false,
    error: null,
    selected: null,
    playingId: null,

    // actions
    // setQuery: (q) => {
    //     set({ query: q });
    //     if (!q || q.length < 2) {
    //         set({ results: [] });
    //         return;
    //     }
    //     get().searchDebounced(q);
    // },
    setQuery: (q) => {
      set({ query: q });

      // jika user mulai mengetik setelah sebelumnya memilih track,
      // hapus pilihan sehingga pencarian bisa dimulai kembali
      if (get().selected && q && q.length > 0) {
        set({ selected: null });
      }

      // jika ada selection saat query belum berubah (mis. user tidak mengetik),
      // jangan jalankan searchDebounced agar tidak melakukan request tak perlu
      if (get().selected) {
        // early return: jangan trigger search ketika ada pilihan aktif
        return;
      }

      if (!q || q.length < 2) {
        set({ results: [] });
        return;
      }
      get().searchDebounced(q);
    },

    search: async (q) => {
      set({ loading: true, error: null });
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/spotify/search`,
          {
            params: { q }, // FIX: gunakan parameter q dari fungsi
          }
        );
        const tracks = normalize(res.data);
        set({ results: tracks, loading: false });
      } catch (err) {
        const message =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.message;
        set({ error: message, loading: false });
      }
    },

    searchDebounced: (q) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => get().search(q), 300);
    },

    selectTrack: (track) => set({ selected: track }),
  };
});

export default useSpotifyStore;
