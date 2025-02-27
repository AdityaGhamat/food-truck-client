import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const CartItems = ({
  name,
  quantity,
  price,
  image,
  _id,
  setCart,
  getCart,
  cart,
}) => {
  const removeFromCart = async (id) => {
    const res = await axios.delete(
      `https://food-restaurant-application-api.onrender.com/api/v1/cart/remove-from-cart/${id}`
    );
    const data = await res.data;
    toast.success(data.message);
    setCart(data.cartItems);
    await getCart();
  };

  const incrementQuantity = async (id) => {
    const res = await axios.put(
      `https://food-restaurant-application-api.onrender.com/api/v1/cart/increment-quantity/${id}`
    );
    const data = await res.data;
    setCart(data.cartItems);
    await getCart();
  };

  const decrementQuantity = async (id) => {
    const res = await axios.put(
      `https://food-restaurant-application-api.onrender.com/api/v1/cart/decrement-quantity/${id}`
    );
    const data = await res.data;
    setCart(data.cartItems);
    await getCart();
  };

  return (
    <div className="flex gap-2 shadow-md rounded-lg p-2 mb-3">
      <MdDelete
        onClick={() => {
          removeFromCart(_id);
        }}
        className="absolute right-7 text-gray-600 cursor-pointer"
      />
      <img src={image} alt="" className="w-[50px] h-[50px] " />
      <div className="leading-5">
        <h2 className="font-bold text-gray-800">{name}</h2>
        <div className="flex justify-between ">
          <span className="text-green-500 font-bold">₹{price}</span>
          <div className="flex justify-center items-center gap-2 absolute right-7">
            <AiOutlineMinus
              onClick={() =>
                quantity > 1 ? decrementQuantity(_id) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
            <span>{quantity}</span>
            <AiOutlinePlus
              onClick={() =>
                quantity >= 1 ? incrementQuantity(_id) : (quantity = 0)
              }
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
