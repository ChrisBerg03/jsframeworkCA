export async function getData(limit, sortOrder) {
    const url = `https://v2.api.noroff.dev/online-shop?limit=${limit}&sortOrder=${sortOrder}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        return [];
    }
}
