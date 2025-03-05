import { create } from "zustand";

export const useCart = create((set) => ({
    cart: [],

    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find(
                (item) => item.id === product.id
            );
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

    removeFromCart: (productId) =>
        set((state) => {
            const updatedCart = state.cart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);
            return { cart: updatedCart };
        }),

    removeAll: () => set({ cart: [] }),
}));
