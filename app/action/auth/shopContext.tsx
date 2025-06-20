// context/ShopContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Shop {
    _id: string;
    name: string;
}

interface ShopContextType {
    selectedShop: Shop | null;
    setSelectedShop: (shop: Shop) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

    return (
        <ShopContext.Provider value={{ selectedShop, setSelectedShop }
        }>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) throw new Error("useShop must be used within a ShopProvider");
    return context;
};
