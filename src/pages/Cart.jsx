import React from "react";
import { useCart } from "../stores/store";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, removeAll } = useCart();

    const totalPrice = cart.reduce((sum, item) => {
        const itemPrice = item.discountedPrice ?? item.price;
        return sum + itemPrice * item.quantity;
    }, 0);

    return (
        <div className="flex w-dvw justify-center pt-8">
            <div className="p-4 border rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between p-2 border-b items-center"
                            >
                                <img
                                    src={item.image.url}
                                    alt={item.image.alt || item.title}
                                    className="w-16 rounded-2xl"
                                />
                                <div className="flex-1 px-2">
                                    <p className="font-medium">{item.title}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>
                                        Price:{" "}
                                        <span className="font-bold">
                                            {item.discountedPrice
                                                ? `${item.discountedPrice.toFixed(
                                                      2
                                                  )} NOK`
                                                : `${item.price.toFixed(
                                                      2
                                                  )} NOK`}
                                        </span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {cart.length > 0 && (
                    <>
                        <div className="text-lg font-bold mt-4">
                            Total: {totalPrice.toFixed(2)} NOK
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <Link
                                to={"/checkout"}
                                className="cursor-pointer w-2/3 bg-gray-800 text-white px-4 py-2 rounded"
                            >
                                Continue to checkout
                            </Link>
                            <button
                                onClick={removeAll}
                                className="cursor-pointer w-1/4 bg-gray-800 text-white px-4 py-2 rounded"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
