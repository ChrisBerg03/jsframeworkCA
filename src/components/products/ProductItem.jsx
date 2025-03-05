import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../stores/store";

const url = "https://v2.api.noroff.dev/online-shop/";

export default function ProductItem() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;

        async function fetchProduct() {
            try {
                const response = await fetch(`${url}${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data = await response.json();
                console.log(data.data);

                setProduct(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-10">
                <img
                    src={product.image.url}
                    alt={product.image.alt || "Product image"}
                    className="w-full h-[400px] object-cover rounded-2xl"
                />

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {product.title}
                    </h2>
                    <p className="text-gray-500 mt-2">{product.description}</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <p className="text-xl font-semibold">
                        Price:{" "}
                        {product.discountedPrice !== product.price ? (
                            <>
                                <span className="text-gray-500 line-through mr-2">
                                    {product.price}kr
                                </span>
                                <span className="text-red-500 font-bold">
                                    {product.discountedPrice}kr
                                </span>
                            </>
                        ) : (
                            <span>{product.price}kr</span>
                        )}
                    </p>
                    <p className="text-yellow-500 text-lg">
                        ⭐ {product.rating}/5
                    </p>
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
