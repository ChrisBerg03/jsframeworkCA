// change to a fetch later
import { useState, useEffect } from "react";

const url = "https://v2.api.noroff.dev/online-shop/";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.data);
            setProducts(data.data);
        }
        getProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {products.map((product) => (
                <div
                    key={product.id}
                    className="max-w-sm bg-white rounded-2xl shadow-lg p-5 space-y-4"
                >
                    <img
                        src={product.image.url}
                        alt={
                            product.image.alt
                                ? product.image.alt
                                : "Product image"
                        }
                        className="w-full h-60 object-cover rounded-xl"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">
                            {product.title}
                        </h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="mt-2 text-lg font-medium">
                            Price:{" "}
                            {product.discountedPrice !== product.price ? (
                                <>
                                    <span className="text-gray-500 line-through mr-2">
                                        {product.price}kr
                                    </span>
                                    <span className="text-red-500 font-bold">
                                        Sale: {product.discountedPrice}kr
                                    </span>
                                </>
                            ) : (
                                <span>{product.price}kr</span>
                            )}
                        </p>
                        <p className="text-yellow-500 mt-2">
                            ⭐ {product.rating}/{5}
                        </p>
                        <div className="mt-3 flex gap-2">
                            {product.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>{" "}
                        {product.reviews.length > 0 && (
                            <div className="mt-4 border-t pt-3">
                                <h3 className="text-sm font-semibold">
                                    Reviews:
                                </h3>
                                {product.reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="mt-2 p-2 bg-gray-100 rounded-lg"
                                    >
                                        <p className="text-sm font-medium">
                                            Name: {review.username}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Description: {review.description}
                                        </p>
                                        <p className="text-yellow-500 text-sm">
                                            ⭐ {review.rating}/{5}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
