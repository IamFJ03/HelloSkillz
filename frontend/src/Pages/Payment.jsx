import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Check, Crown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {

    const RAZORPAY_KEY_ID = 'rzp_test_RTJBBXdu6qLigb';

    const [modal, setModal] = useState(false)
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const loadRazorpay = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }
    const navigate = useNavigate();
    useEffect(() => {
        loadRazorpay()
    }, [])

    const handlePayment = async (amount) => {
        if (isLoading || amount <= 0) return;
        setIsLoading(true);
        setStatus('Initiating payment... Please wait.');
        try {
            const response = await axios.post("http://localhost:5000/api/payment/createOrders", {
                amount: amount * 100,
                currency: "USD"
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

                    const verifyResponse = await axios.get(`http://localhost:5000/api/payment/${razorpay_payment_id}`, {
                        withCredentials: true
                    });
                    const paymentDetails = verifyResponse.data;
                    if (paymentDetails.status === "captured") {
                        setStatus(`Payment Succeded! Status: ${paymentDetails.status.toUpperCase()}. Id: ${razorpay_payment_id}`);
                        setTimeout(() => {
                            navigate("/");
                        }, 5000);
                    }
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
                <div className='flex items-center justify-between'>
                    <p className='font-sans text-4xl font-bold'>Unlock Premium Flavors</p>
                    <p className='bg-blue-200 text-white py-1 px-2 rounded-lg cursor-pointer hover:scale-110 transition-all duration-500 shadow-md' onClick={() => setModal(true)}>Show Info</p>
                </div>
                <p className='text-lg mt-2'>Elevate Your culinary Journey with exclusive benefits.</p>
            </div>
            <div className='flex flex-col gap-10 md:flex-row justify-between px-20 mt-10'>
                {info.map((data, index) => (
                    <div className='md:h-70 w-[90%] bg-white shadow-md rounded-2xl text-center hover:scale-110 hover:-mt-5 border border-transparent hover:border-blue-400 cursor-pointer transition-all duration-500'>
                        <Crown size={30} color='yellow' className='ml-45' />
                        <p className='text-lg font-bold text-center mt-3'>{data.heading}</p>
                        <p className='text-2xl font-bold'>${data.amount}/{data.for}</p>
                        <div className='my-5 text-left px-20'>
                            <div className='flex items-center gap-2'>
                                <Check size={20} color='green' /><p>{data.subHead1}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Check size={20} color='green' /><p>{data.subHead2}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Check size={20} color='green' /><p>{data.subHead3}</p>
                            </div>
                        </div>
                        <button className='text-white bg-blue-200 px-18 py-1.5 rounded-lg cursor-pointer' onClick={() => handlePayment(data.amount)}>{data.buttonTag}</button>
                    </div>
                ))}
            </div>
            <p className='ml-[25%] mt-15 font-mono text-xl text-green-400'>{isLoading ? 'Processing...' : status}</p>
            <div className={`bg-black/50 fixed inset-0 ${modal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} duration-500`}>
                <div className={`py-5 md:w-100 w-[90%] bg-white rounded-xl mt-50 md:ml-[35%] ml-[5%] px-10 ${modal ? 'scale-100' : 'scale-0'} duration-500 transition-transform`}>
                    <div className='flex justify-between items-center'>
                        <p className=' text-xl font-semibold font-mono'>Few Important Instructions!!</p>
                        <X size={25} color='black' onClick={() => setModal(false)} className={`cursor-pointer`} />
                    </div>
                    <p className='my-5'>Since the payment is now on test mode it is not live you can use credentials given below to continue:</p>
                    <span className='font-bold'>Card Number: </span><span> 4718 6091 0820 4366</span><br />
                    <span className='font-bold'>CVV:</span><span>111</span><br />
                    <span className='font-bold'>OTP:</span><span>OTP: 123(Skip First time asked use it 2nd time)</span>
                </div>
            </div>
        </div>
    )
}
