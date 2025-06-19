export default async function imageUpload(file: File): Promise<string | null> {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const formData = new FormData();

    if (!apiKey) {
        throw new Error("IMGBB API key is not defined");
    }
    
    formData.append("key", apiKey);
    formData.append("image", file);

    try {
        const res = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.success) {
            return data.data.url; // ✅ Image URL returned
        } else {
            console.error("Upload failed:", data);
            return null;
        }
    } catch (error) {
        console.error("Upload error:", error);
        return null;
    }
}
