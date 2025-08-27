"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the basket item and basket types
export type BasketItem = {
	productId: string;
	variations: Record<string, string>; // Selected variations
	quantity: number;
	full_size_url?: string; // URL of the first image
	thumbnail_url?: string; // URL of the thumbnail image
	name?: string; // Name of the product
	slug?: string; // Slug of the product
	sku?: string; // SKU of the product
	recalculatedPrice?: number; // Price after variations
	oldPrice?: number; // Previous price for comparison
	stockError?: boolean; // Stock error flag
	currentStock?: number; // Current stock count - when user adds item to cart (can be different from verifiedStock by time they go to buy)
	verifiedStock?: number; // Verified stock count - called from api verify wen checking out
	is_digital: boolean; // Flag for digital products
};

type Basket = BasketItem[];

// Define the context shape
export type BasketContextType = {
  basket: Basket;
  addItem: (item: BasketItem) => void;
  removeItem: (productId: string, variations: Record<string, string>) => void;
  clearBasket: () => void;
  incrementItem: (
    productId: string,
    variations: Record<string, string>
  ) => void;
  decrementItem: (
    productId: string,
    variations: Record<string, string>
  ) => void;
  updateBasketItem: (
    productId: string,
    variations: Record<string, string>,
    updatedFields: Partial<BasketItem>
  ) => void;
};

// Create the context
const BasketContext = createContext<BasketContextType | undefined>(undefined);

// Utility hook to use the context
export const useBasket = (): BasketContextType => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

// BasketProvider to wrap the app
export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<Basket>([]);

  // Load basket from localStorage on the client side
  const syncWithLocalStorage = () => {
    if (typeof window !== "undefined") {
      const savedBasket = localStorage.getItem("shopping_basket");
      if (savedBasket) {
        setBasket(JSON.parse(savedBasket));
      } else {
        setBasket([]);
      }
    }
  };

  useEffect(() => {
    syncWithLocalStorage();

    // Listen for `storage` events to sync across tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "shopping_basket") {
        syncWithLocalStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Save basket to localStorage whenever it changes
  const updateLocalStorage = (updatedBasket: Basket) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopping_basket", JSON.stringify(updatedBasket));
      syncWithLocalStorage(); // Ensure the in-memory state is synced
    }
  };

  const addItem = (item: BasketItem) => {
    syncWithLocalStorage(); // Sync before updating

    setBasket((prevBasket) => {
      const existingItemIndex = prevBasket.findIndex(
        (i) =>
          i.productId === item.productId &&
          JSON.stringify(i.variations) === JSON.stringify(item.variations)
      );

      if (existingItemIndex !== -1) {
        const updatedBasket = [...prevBasket];
        updatedBasket[existingItemIndex].quantity += item.quantity;

        // Update images if provided
        updatedBasket[existingItemIndex].full_size_url =
          item.full_size_url || updatedBasket[existingItemIndex].full_size_url;
        updatedBasket[existingItemIndex].thumbnail_url =
          item.thumbnail_url || updatedBasket[existingItemIndex].thumbnail_url;

        // Update SKU if provided
        updatedBasket[existingItemIndex].sku =
          item.sku || updatedBasket[existingItemIndex].sku;

        updateLocalStorage(updatedBasket);
        return updatedBasket;
      }

      const updatedBasket = [...prevBasket, item];
      updateLocalStorage(updatedBasket);
      return updatedBasket;
    });
  };

  const removeItem = (
    productId: string,
    variations: Record<string, string>
  ) => {
    syncWithLocalStorage(); // Sync before updating

    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.filter(
        (item) =>
          item.productId !== productId ||
          JSON.stringify(item.variations) !== JSON.stringify(variations)
      );
      updateLocalStorage(updatedBasket);
      return updatedBasket;
    });
  };

  const clearBasket = () => {
    setBasket([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("shopping_basket");
    }
  };

  const incrementItem = (
    productId: string,
    variations: Record<string, string>
  ) => {
    syncWithLocalStorage(); // Sync before updating

    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) => {
        if (
          item.productId === productId &&
          JSON.stringify(item.variations) === JSON.stringify(variations)
        ) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      updateLocalStorage(updatedBasket);
      return updatedBasket;
    });
  };

  const decrementItem = (
    productId: string,
    variations: Record<string, string>
  ) => {
    syncWithLocalStorage(); // Sync before updating

    setBasket((prevBasket) => {
      const updatedBasket = prevBasket
        .map((item) => {
          if (
            item.productId === productId &&
            JSON.stringify(item.variations) === JSON.stringify(variations)
          ) {
            return {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      updateLocalStorage(updatedBasket);
      return updatedBasket;
    });
  };

  const updateBasketItem: BasketContextType["updateBasketItem"] = (
    productId,
    variations,
    updatedFields
  ) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) => {
        if (
          item.productId === productId &&
          JSON.stringify(item.variations) === JSON.stringify(variations)
        ) {
          return {
            ...item,
            oldPrice: item.recalculatedPrice, // Save old price before updating
            ...updatedFields,
          };
        }
        return item;
      })
    );
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addItem,
        removeItem,
        clearBasket,
        incrementItem,
        decrementItem,
        updateBasketItem,
      }}>
      {children}
    </BasketContext.Provider>
  );
};
