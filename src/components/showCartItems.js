// src/components/ShowCartItems.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemQuantity, clearCart } from "../utils/cartSlice";
import EmptyCart from "./emptycart";
import PaymentDemo from "./PaymentDemo"; // Import the PaymentDemo component

// Formatter for Indian Rupees with two decimal places
const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const ShowCartItems = ({ cartItems }) => {
    const dispatch = useDispatch();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false); // State to manage payment demo visibility

    const handleQuantityChange = (id, quantityChange) => {
        dispatch(updateItemQuantity({ id, quantityChange }));
    };

    const cartclear = () => {
        const confirmClear = window.confirm("Are you sure you want to clear the cart?");
        if (confirmClear) {
            dispatch(clearCart());
        }
    };

    const handleProceedToCheckout = () => {
        setIsPaymentOpen(true);
    };

    const handlePaymentSuccess = () => {
        setIsPaymentOpen(false);
        dispatch(clearCart());
        alert("Payment Successful! Thank you for your purchase.");
    };

    const handlePaymentCancel = () => {
        setIsPaymentOpen(false);
    };

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((accumulator, item) => {
        const itemPrice = (item.price || item.defaultPrice || 0) / 100;
        return accumulator + (itemPrice * item.quantity);
    }, 0);

    // Format total price
    const formattedTotalPrice = formatter.format(totalPrice);

    return (
        <div className="p-4 relative">
            <div className="max-w-5xl m-auto flex justify-between items-center mb-4">
                <p className="text-2xl font-semibold">Cart</p>
                <button
                    className="cursor-pointer text-base border border-solid rounded-2xl px-3 py-1 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    onClick={cartclear}
                >
                    Clear Cart
                </button>
            </div>
            {cartItems.map((item) => {
                const itemTotalPrice = ((item.price || item.defaultPrice || 0) / 100) * item.quantity;
                const formattedItemTotalPrice = formatter.format(itemTotalPrice);
                return (
                    <div
                        key={item.id}
                        className="flex justify-center max-w-5xl border-b-2 p-4 mx-auto menu-card"
                    >
                        <ul className="flex justify-between w-9/12 items-center">
                            <img
                                className="select-none w-44 h-32 border rounded-xl object-cover menu-img"
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                                alt={item.name}
                            />
                            <div className="w-1/3 flex flex-col gap-2">
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <p className="text-gray-600">{item.category}</p>
                                {item.itemAttribute.vegClassifier === 'VEG' ? (
                                    <span className="tracking-widest border rounded-md px-1 w-11 bg-green-600 text-white text-center">
                                        {item.itemAttribute.vegClassifier}
                                    </span>
                                ) : (
                                    <span className="tracking-widest border rounded-md px-1 w-1/3 bg-red-600 text-white text-center">
                                        {item.itemAttribute.vegClassifier}
                                    </span>
                                )}
                            </div>
                            <div className="px-2 flex w-1/5 justify-center gap-6 customize-cart items-center">
                                <i
                                    className={`bi bi-dash-lg cursor-pointer text-xl ${item.quantity === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:text-red-600'}`}
                                    onClick={() => item.quantity >= 1 && handleQuantityChange(item.id, -1)}
                                ></i>
                                <p className="text-lg font-medium">{item.quantity}</p>
                                <i
                                    className="bi bi-plus-lg cursor-pointer text-xl hover:text-green-600"
                                    onClick={() => handleQuantityChange(item.id, 1)}
                                ></i>
                            </div>
                            <p className="text-xl font-bold">
                                {formattedItemTotalPrice}
                            </p>
                        </ul>
                    </div>
                );
            })}
            {/* Total Price Section */}
            <div className="flex justify-end max-w-5xl m-auto mt-6">
                <div className="w-1/3 p-4 border-t-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-semibold">{formattedTotalPrice}</span>
                    </div>
                    {/* Additional details like taxes or discounts can be added here */}
                    <div className="mt-4">
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
                            onClick={handleProceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Demo Modal */}
            {isPaymentOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <PaymentDemo
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentCancel={handlePaymentCancel}
                    />
                </div>
            )}
        </div>
    );
};

export default ShowCartItems;
