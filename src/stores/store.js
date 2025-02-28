import { create } from "zustand";

export const useCart = create((set) => ({
    addToCart: () => set(),
    removeFromCart: () => set(),
    removeAll: () => set(),
}));
