import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData, search } from "../../fetches/fetch";

const url = "https://v2.api.noroff.dev/online-shop/";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState("");

    useEffect(() => {
        async function getProducts() {
            const response = await getData(limit, sortOrder);
            setProducts(response.data);
        }
        getProducts();
    }, [limit, sortOrder]);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Sort: {sortOrder.toUpperCase()}
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
                            <img
                                src={product.image?.url || "default-image-url"} // Use a fallback image if image.url is missing
                                alt={product.image?.alt || "Product image"} // Use a fallback alt text if image.alt is missing
                                className="w-full h-60 object-cover rounded-xl"
                            />
                            <h2 className="text-lg font-semibold">
                                {product.title || "No title available"}{" "}
                                {/* Fallback if title is missing */}
                            </h2>
                            <p className="text-gray-600">
                                {product.description ||
                                    "No description available"}{" "}
                                {/* Fallback if description is missing */}
                            </p>
                            <p className="mt-2 text-lg font-medium">
                                Price:{" "}
                                {product.discountedPrice !== product.price ? (
                                    <>
                                        <span className="text-gray-500 line-through mr-2">
                                            {product.price}kr
                                        </span>
                                        <br />
                                        <span className="text-red-500 font-bold">
                                            Sale: {product.discountedPrice}kr
                                        </span>
                                    </>
                                ) : (
                                    <span>{product.price}kr</span>
                                )}
                            </p>
                            <p className="text-yellow-500 mt-2">
                                ⭐ {product.rating || "No rating"} / 5{" "}
                                {/* Fallback if rating is missing */}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setLimit(limit + 10)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                    Load More
                </button>
            </div>
        </div>
    );
}
