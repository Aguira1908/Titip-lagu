// useFetchMessage.js
import { create } from "zustand";
import axios from "axios";
import { SanitizeData } from "./useSanitizeData";

const useFetchMessage = create((set, get) => ({
    contentData: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    hasMore: true, // untuk tahu masih ada data atau tidak

    fetchMessage: async (opts = {}) => {
        const { namaQuery = null, page = 1, append = false } = opts;
        const perPage = 10;

        set({ isLoading: true, error: null });

        try {
            const params = { per_page: perPage, page };
            if (namaQuery?.trim()) params.nama = namaQuery;

            const response = await axios.get(`/api/messages`, { params });
            const payload = response?.data?.data ?? response?.data ?? [];

            const cleanData = SanitizeData(payload);

            set((state) => ({
                contentData: append
                    ? [...state.contentData, ...cleanData]
                    : cleanData,
                isLoading: false,
                currentPage: page,
                hasMore: cleanData.length === perPage, // kalau kurang dari perPage berarti sudah habis
            }));
        } catch (err) {
            set({ error: err, isLoading: false });
            console.error("Failed to fetch message", err);
        }
    },
}));

export default useFetchMessage;
