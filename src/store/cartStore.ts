    // components/store/cartStore.ts
    import { create } from "zustand";
    import { persist } from "zustand/middleware";
    

    type CartItem = {
    ID: number;
    Name: string;
    RetailPrice: string;
    ThumbnailURL: string;
    Size: string;
    Color: string;
    Quantity: number;
    };

    type CartStore = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    };

    export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
        items: [],
        addItem: (item) => {
            const existing = get().items.find((i) => i.ID === item.ID);
            if (existing) {
            set({
                items: get().items.map((i) =>
                i.ID === item.ID
                    ? { ...i, Quantity: i.Quantity + item.Quantity }
                    : i
                ),
            });
            } else {
            set({ items: [...get().items, item] });
            }
        },
        removeItem: (id) =>
            set({ items: get().items.filter((item) => item.ID !== id) }),
        updateQuantity: (id, quantity) =>
            set({
            items: get().items.map((item) =>
                item.ID === id ? { ...item, Quantity: quantity } : item
            ),
            }),
        clearCart: () => set({ items: [] }),
        }),
        {
        name: "cart-storage", // key in localStorage
        }
    )
    );
