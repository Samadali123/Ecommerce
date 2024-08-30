import React, { createContext, useEffect, useState } from "react";
import {
  fetchItemData,
  fetchCurrentUser,
  updateUser,
} from "./apiCallFunctions";
import { ShowToast } from "../utils/ToastUtils";

export const contextData = createContext(null);

const ContextApi = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);

  const initializeData = async () => {
    await fetchItemData(setItems);
    await fetchCurrentUser(setCurrentUser, setCart);
  };

  useEffect(() => {
    initializeData();
  }, []);

  const addToCart = async (item) => {
    if (currentUser) {
      const existingItem = cart.find((cartItem) => cartItem._id === item._id);
      if (!existingItem) {
        const updatedCart = [...cart, { ...item, quantity: 1 }];
        const updateStatus = await updateUser({ cart: updatedCart });
        if (updateStatus) {
          setCart(updatedCart);
          ShowToast(`${item.name} added`);
        }
      }
    } else {
      ShowToast("Please log in to add items to your cart", "warning");
    }
  };

  const isItemInCart = (itemId) =>
    cart.some((cartItem) => cartItem._id === itemId);

  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    setCart([]);
    ShowToast("Please log in to access your account", "warning");
  };

  const contextValue = {
    currentUser,
    cart,
    items,
    initializeData,
    setCart,
    addToCart,
    isItemInCart,
    logout,
  };

  return (
    <contextData.Provider value={contextValue}>{children}</contextData.Provider>
  );
};

export default ContextApi;
