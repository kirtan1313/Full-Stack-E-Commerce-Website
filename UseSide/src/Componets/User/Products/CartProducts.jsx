import React, { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemsCart } from "../../Service/Action/cartAction";
import { useNavigate } from "react-router-dom";

const CartProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, loading } = useSelector((state) => state.cartProducts)
      const { user } = useSelector((state) => state.user);

    const incrementQty = (id, quantity, stock) => {
        const newQut = quantity + 1
        if (stock <= quantity) {
            return
        }
        dispatch(addItemToCart(id, newQut))
    };

    const decrementQty = (id, quantity) => {
        const newQut = quantity - 1
        if (1 >= quantity) {
            return
        }
        dispatch(addItemToCart(id, newQut))
    };

    const removeFromCart = (id) => {
        dispatch(removeItemsCart(id))
    };

    const getTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const proccessChecOut =()=>{
        if(!user){
            navigate('/login')
        }else{
            navigate('/shipping')
        }
    }

    return (
        <>
            {
                loading ? (
                    <div className="h-screen flex justify-center items-center bg-gray-100" >
                        <LoadingAnimation />
                    </div >
                ) : (
                    <div className="min-h-screen bg-gray-100 p-6 mt-14">
                        <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

                        <div className="max-w-4xl mx-auto p-6 rounded-lg">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-500">Your cart is empty.</p>
                            ) : (
                                <>
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between border-b pb-4 mb-4"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item.images}
                                                    alt={item.name}
                                                    className="w-20 h-20 rounded object-cover"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">₹{item.price}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decrementQty(item.product, item.quantity)}
                                                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                                                >
                                                    <FaMinus size={14} />
                                                </button>
                                                <span className="text-lg">{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementQty(item.product, item.quantity, item.stock)}
                                                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                                                >
                                                    <FaPlus size={14} />
                                                </button>
                                            </div>

                                            <p className="font-semibold text-gray-800">
                                                ₹{item.price * item.quantity}
                                            </p>

                                            <button
                                                onClick={() => removeFromCart(item.product)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}

                                    <div className="text-right">
                                        <h3 className="text-xl font-bold">
                                            Total: ₹{getTotal().toFixed(2)}
                                        </h3>
                                        <button
                                        onClick={proccessChecOut}
                                         className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default CartProducts;
