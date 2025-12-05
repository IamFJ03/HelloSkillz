import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Check } from 'lucide-react';

export default function Payment() {
    const RAZORPAY_KEY_ID = 'rzp_test_RTJBBXdu6qLigb';

    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loadRazorpay = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }

    useEffect(() => {
        loadRazorpay()
    }, [])

    const handlePayment = async (e) => {
        e.preventDefault();

        if (isLoading || amount <= 0) return;

        setIsLoading(true);
        setStatus('Initiating payment... Please wait.');
        try {
            const response = await axios.post("http://localhost:5000/api/payment/createOrders", {
                amount: amount * 100,
                currency: "INR"
            });

            const { order_id, amount: orderAmount, currency } = response.data;
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: amount * 100,
                currency: currency,
                name: "Faheem Jawaid",
                order_id: order_id,
                description: "Product Purchase",
                handler: async function (response) {
                    setIsLoading(true);
                    setStatus("Payment Succesfull, Verifying Payment");
                    const { razorpay_payment_id } = response;

                    const verifyResponse = await axios.get(`http://localhost:5000/api/payment/${razorpay_payment_id}`);
                    const paymentDetails = verifyResponse.data;
                    if (paymentDetails.status === "captured")
                        setStatus(`Payment Succeded! Status: ${paymentDetails.status.toUpperCase()}. Id: ${razorpay_payment_id}`);
                    else
                        setStatus(`Payment verification failed. Status: ${paymentDetails.status.toUpperCase()}`);

                    setIsLoading(false);
                },
                prefill: {
                    name: "Faheem Jawaid",
                    email: "faheemjawaid12@gmail.com",
                    contact: "9012345678"
                },
                theme: {
                    color: '#007bff'
                }
            };
            const rzp = new window.Razorpay(options)
            rzp.on('payment.failed', (response) => {
                setStatus(`Payment Failed: ${response.error.description}`);
                setIsLoading(false);
            });

            rzp.open();
        }
        catch (e) {
            console.error('Payment Error:', e);
            setStatus(`An error occurred. Check console for details. ${e.response?.data?.error || 'Server error.'}`);
        }
    }

    const info = [
        { heading: "Monthly Plan", amount: 9.99, for: "month", subHead1: "Ad-free browsing recipes", subHead2: "Exclusive recipe Collections", subHead3: "Advanced Filter Options", buttonTag: "Subscribe Monthly" },
        { heading: "Annual Plan", amount: 99.99, for: "year", subHead1: "Unlimited Saved Recipes", subHead2: "Exclusive Recipe Collections", subHead3: "Advanced Filter Options", buttonTag: "Subscribe Annually" },
        { heading: "Lifetime Plan", amount: 249.99, for: "Lifetime", subHead1: "All Annual Plan benefits", subHead2: "Future updates Included", subHead3: "Priority Support", buttonTag: "Buy Lifetime" }
    ]

    return (
        <div>
            <Navbar />
            <div className='px-20 py-10'>
                <p className='font-sans text-4xl font-bold '>Unlock Premium Flavors</p>
                <p className='text-lg mt-2'>Elevate Your culinary Journey with exclusive benefits.</p>
            </div>
            <div className='flex justify-between px-20 mt-10'>
                {info.map((data, index) =>  (
                    <div className='h-70 w-100 bg-white shadow-md rounded-2xl text-center hover:scale-110 hover:-mt-5 border border-transparent hover:border-blue-400 cursor-pointer transition-all duration-500'>
                        <p className='text-lg font-bold text-center mt-3'>{data.heading}</p>
                        <p className='text-2xl font-bold'>${data.amount}/{data.for}</p>
                        <div className='my-5 text-left px-20'>
                            <div className='flex items-center gap-2'>
                        <Check size={20} color='black'/><p>{data.subHead1}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                        <Check size={20} color='black'/><p>{data.subHead2}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                        <Check size={20} color='black'/><p>{data.subHead3}</p>
                        </div>
                        </div>
                        <button className='text-white bg-blue-200 px-18 py-1.5 rounded-lg cursor-pointer'>{data.buttonTag}</button>
                    </div>
                ))}
            </div>

            <button type="submit" disabled={isLoading} className='bg-[#5cb85c] rounded text-white py-2'>
                {isLoading ? 'Processing...' : `Pay ₹${amount}`}
            </button>

            <p>{status}</p>
        </div>
    )
}
