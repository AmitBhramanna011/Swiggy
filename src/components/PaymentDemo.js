// src/components/PaymentDemo.jsx
import React, { useState } from "react";

const PaymentDemo = ({ onPaymentSuccess, onPaymentCancel }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (
            cardNumber.length !== 16 ||
            !/^\d+$/.test(cardNumber) ||
            !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) ||
            cvv.length !== 3 ||
            !/^\d+$/.test(cvv) ||
            cardHolder.trim() === ""
        ) {
            setError("Please enter valid payment details.");
            return;
        }

        setError("");
        setIsProcessing(true);

        // Simulate payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            onPaymentSuccess();
        }, 2000);
    };

    const handleCancel = () => {
        onPaymentCancel();
    };

    if (isSuccess) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <button
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    onClick={handleCancel}
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Card Holder Name</label>
                    <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        required
                    />
                </div>
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Expiry (MM/YY)</label>
                        <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">CVV</label>
                        <input
                            type="password"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="123"
                            maxLength="3"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={handleCancel}
                        disabled={isProcessing}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none ${
                            isProcessing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : "Pay Now"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentDemo;
