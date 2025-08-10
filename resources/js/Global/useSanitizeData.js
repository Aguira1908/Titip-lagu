import DOMPurify from "dompurify";

export const SanitizeData = (data) => {
    if (typeof data === "string") {
        // Jika data adalah string, periksa apakah itu HTML
        return DOMPurify.sanitize(data);
    } else if (Array.isArray(data)) {
        // Jika data adalah array, iterasi dan sanitasi setiap elemen
        return data.map((item) => SanitizeData(item));
    } else if (typeof data === "object" && data !== null) {
        // Jika data adalah objek, iterasi dan sanitasi setiap properti
        const sanitizedObject = {};
        Object.keys(data).forEach((key) => {
            sanitizedObject[key] = SanitizeData(data[key]);
        });
        return sanitizedObject;
    }
    // Jika data bukan string, array, atau objek, kembalikan data apa adanya
    return data;
};
