import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Currency } from 'lucide-react';

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
                    const { razorpay_payment_id} = response;
                    
                        const verifyResponse = await axios.get(`http://localhost:5000/api/payment/${razorpay_payment_id}`);
                        const paymentDetails = verifyResponse.data;
                        if(paymentDetails.status==="captured")
                            setStatus(`Payment Succeded! Status: ${paymentDetails.status.toUpperCase()}. Id: ${razorpay_payment_id}`);
                        else
                            setStatus(`Payment verification failed. Status: ${paymentDetails.status.toUpperCase()}`);

                        setIsLoading(false);
                    },
                prefill: {
                    name:"Faheem Jawaid",
                    email: "faheemjawaid12@gmail.com",
                    contact:"9012345678"
                },
                theme:{
                    color:'#007bff'
                }
            };
            const rzp = new window.Razorpay(options)
            rzp.on('payment.failed', (response) => {
                setStatus(`Payment Failed: ${response.error.description}`);
                setIsLoading(false);
            });

            rzp.open();
        }
        catch(e){
console.error('Payment Error:', e);
      setStatus(`An error occurred. Check console for details. ${e.response?.data?.error || 'Server error.'}`);
        }
  }

    return (
        <div>
            <div>
                <p className='flex justify-center font-mono text-2xl font-bold'>React Razorpay payment Integration</p>
            </div>
            <form onSubmit={handlePayment} className='flex flex-col gap-5 mt-10 w-80 ml-150 border-2 p-5 rounded'>
                <label htmlFor="amount" className='text-xl font-mono'>
                    Amount (in ₹):
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                    className='rounded text-lg p-1'
                    required

                />

                <button type="submit" disabled={isLoading} className='bg-[#5cb85c] rounded text-white py-2'>
                    {isLoading ? 'Processing...' : `Pay ₹${amount}`}
                </button>
            </form>
            <p>{status}</p>
        </div>
    )
}
