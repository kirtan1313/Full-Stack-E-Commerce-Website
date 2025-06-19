import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shipingInfo, cartItems } = useSelector((state) => state.cartProducts);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shippingCharges = subtotal > 1000 ? 0 : 50;
    const gst = subtotal * 0.18;
    const totalPrice = subtotal + shippingCharges + gst;

    if (!shipingInfo || !shipingInfo.address) {
        return (
            <div className="text-center text-red-500 mt-16">
                Shipping information is missing. Please go back and fill it in.
            </div>
        );
    }

    const address = `${shipingInfo.address}, ${shipingInfo.city}, ${shipingInfo.state} - ${shipingInfo.pincode}`;


    const proccessPayment = () => {
        const data = {
            shippingCharges, subtotal, gst, totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/proccess/payment')
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Confirm Order</h2>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold mb-2">Shipping Info</h3>
                        <p><strong>Name:</strong> {user?.name || "Guest"}</p>
                        <p><strong>Phone:</strong> {shipingInfo?.phone || "N/A"}</p>
                        <p><strong>Address:</strong> {address}</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold mb-2">Your Cart Items:</h3>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex justify-between items-center border-b pb-2">
                                    <div className="flex items-center gap-4">
                                        <img src={item.images} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <span>{item.name}</span>
                                    </div>
                                    <span> ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow h-fit">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>GST (18%):</span>
                            <span>₹{gst.toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={proccessPayment}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrder;
