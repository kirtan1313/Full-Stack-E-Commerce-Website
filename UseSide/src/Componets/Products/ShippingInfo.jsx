import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShipingInfo } from "../Service/Action/cartAction";
import { useNavigate } from "react-router-dom";

const ShippingInfo = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        country: "",
        zip: "",
        city: "",
        state: "",
        phone: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, address, country, zip, city, state, phone } = form;

        if (!firstName || !lastName || !address || !country || !zip || !city || !state || !phone) {
            alert("Please fill in all the fields");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        dispatch(saveShipingInfo({ firstName, lastName, address, country, zip, city, state, phone }));
        navigate("/order/confirm");
    };

    return (
        <div className="max-w-2xl mx-auto px-4 mt-16 min-h-screen">
            <h1 className="text-3xl font-bold mb-2">Shipping</h1>
            <p className="text-gray-500 mb-6">Please enter your shipping details.</p>
            <hr className="border-t border-gray-200 mb-6" />

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="outline-none font-semibold"
                            required
                        />
                    </div>

                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="outline-none font-semibold"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col border border-gray-300 p-2 rounded">
                    <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="outline-none font-semibold"
                        required
                    />
                </div>

                <div className="flex flex-col border border-gray-300 p-2 rounded">
                    <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                        Country
                    </label>
                    <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="outline-none font-semibold bg-transparent"
                        required
                    >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="UAE">United Arab Emirates</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Russia">Russia</option>
                        <option value="SouthAfrica">South Africa</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                            Zip Code
                        </label>
                        <input
                            type="text"
                            name="zip"
                            value={form.zip}
                            onChange={handleChange}
                            className="outline-none font-semibold"
                            required
                        />
                    </div>

                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="outline-none font-semibold"
                            required
                        />
                    </div>

                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            className="outline-none font-semibold"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col border border-gray-300 p-2 rounded">
                    <label className="text-[0.65rem] text-gray-500 uppercase mb-1">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="outline-none font-semibold"
                        required
                    />
                </div>

                <hr className="border-t border-gray-200 mt-6" />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 text-sm font-semibold uppercase rounded hover:bg-gray-800 transition"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default ShippingInfo;
