import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../fetches/fetch";

const url = "https://v2.api.noroff.dev/online-shop/";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const response = await getData(limit, sortOrder);
            setProducts(response.data);
        }
        getProducts();
    }, [limit, sortOrder]);

    useEffect(() => {
        if (query.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        const results = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredProducts(results);
    }, [query, products]);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-amber-300"
                />
                {query && filteredProducts.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto z-10">
                        {filteredProducts.map((product) => (
                            <li key={product.id}>
                                <Link
                                    className="flex flex-row cursor-pointer"
                                    to={`/product/${product.id}`}
                                    onClick={() => setQuery("")}
                                >
                                    <img
                                        className="h-20"
                                        src={product.image.url}
                                        alt={product.image.alt}
                                    />
                                    <p className="block px-4 py-2 hover:bg-gray-100 w-full">
                                        {product.title}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-4 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 cursor-pointer"
                >
                    Sort: {sortOrder.toUpperCase()}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
                            <img
                                src={product.image?.url || "default-image-url"}
                                alt={product.image?.alt || "Product image"}
                                className="w-full h-60 object-cover rounded-xl"
                            />
                            <h2 className="text-lg font-semibold">
                                {product.title}
                            </h2>
                            <p className="text-gray-600">
                                {product.description}
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
                                ⭐ {product.rating || "No rating"} / 5
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
