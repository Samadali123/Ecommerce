import axios from "axios";
import { ShowToast } from "../utils/ToastUtils";

export const fetchItemData = async (setItems) => {
  try {
    const response = await axios.get("http://localhost:1111/item/all-items");
    const { data } = response;

    if (data.success) {
      setItems(data.items);
    } else {
      ShowToast("Failed to fetch items", "error");
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    ShowToast("An error occurred while fetching items.", "error");
  }
};

export const fetchCurrentUser = async (setCurrentUser, setCart) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      ShowToast("Please log in to access your account", "warning");
      return;
    }

    const response = await axios.get("http://localhost:1111/user/currentUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    if (data.success) {
      setCurrentUser(data.user);
      setCart(data.user.cart || []);
    } else {
      ShowToast("Failed to fetch user data", "error");
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    ShowToast("Session expired, please log in again.", "error");
    localStorage.removeItem("authToken");
  }
};

export const updateUser = async (updatedDetails) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      ShowToast("Please log in to update your cart", "warning");
      return;
    }

    const { data } = await axios.put(
      "http://localhost:1111/user/update",
      updatedDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      return true;
    }
  } catch (error) {
    console.log;
    if (error.response) {
      ShowToast(error.response.data.message, "error");
    } else {
      ShowToast(error.message, "error");
    }
  }
};
