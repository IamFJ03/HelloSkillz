import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Check, Crown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const RAZORPAY_KEY_ID = 'rzp_test_RTJBBXdu6qLigb';

  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (amount) => {
    if (isLoading || amount <= 0) return;

    setIsLoading(true);
    setStatus('Initiating payment... Please wait.');

    try {
      const response = await axios.post(
        "https://recipetracker-fg4e.onrender.com/api/payment/createOrders",
        { amount: amount * 100, currency: "USD" }
      );

      const { order_id, currency } = response.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency,
        name: "Faheem Jawaid",
        order_id,
        description: "Product Purchase",
        handler: async function (response) {
          setStatus("Payment successful. Verifying...");
          const verifyResponse = await axios.get(
            `https://recipetracker-fg4e.onrender.com/api/payment/${response.razorpay_payment_id}`,
            { withCredentials: true }
          );

          if (verifyResponse.data.status === "captured") {
            setStatus("Payment successful! Redirecting...");
            setTimeout(() => navigate("/"), 4000);
          } else {
            setStatus("Payment verification failed.");
          }
          setIsLoading(false);
        },
        prefill: {
          name: "Faheem Jawaid",
          email: "faheemjawaid12@gmail.com",
          contact: "9012345678"
        },
        theme: { color: "#007bff" }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (res) => {
        setStatus(`Payment Failed: ${res.error.description}`);
        setIsLoading(false);
      });

      rzp.open();
    } catch (e) {
      setStatus("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const plans = [
    {
      title: "Monthly Plan",
      price: 9.99,
      period: "month",
      features: [
        "Ad-free browsing",
        "Exclusive recipes",
        "Advanced filters"
      ],
      btn: "Subscribe Monthly"
    },
    {
      title: "Annual Plan",
      price: 99.99,
      period: "year",
      features: [
        "Unlimited saved recipes",
        "Exclusive collections",
        "Advanced filters"
      ],
      btn: "Subscribe Annually"
    },
    {
      title: "Lifetime Plan",
      price: 249.99,
      period: "lifetime",
      features: [
        "All annual benefits",
        "Future updates",
        "Priority support"
      ],
      btn: "Buy Lifetime"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HEADER */}
      <div className="px-4 sm:px-8 md:px-20 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Unlock Premium Flavors
          </h1>
          <button
            onClick={() => setModal(true)}
            style={{ backgroundColor: '#bfdbfe' }}
            className=" text-white px-4 py-2 rounded-lg
                       transition active:scale-95 md:hover:scale-105"
          >
            Show Info
          </button>
        </div>
        <p className="mt-3 text-lg text-gray-600">
          Elevate your culinary journey with exclusive benefits.
        </p>
      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-8 md:px-20">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 text-center
                       animate-slide-up
                       transition-transform duration-300
                       active:scale-95 md:hover:scale-105"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="flex justify-center mb-4">
              <Crown size={32} color="gold" />
            </div>

            <h2 className="text-lg font-bold">{plan.title}</h2>
            <p className="text-2xl font-extrabold my-2">
              ${plan.price}/{plan.period}
            </p>

            <ul className="text-left mt-5 space-y-2 px-6">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check size={18} color="green" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePayment(plan.price)}
              style={{ backgroundColor: '#bfdbfe' }}
              className="mt-6 w-full  text-white py-2 rounded-lg
                         transition active:scale-95 md:hover:bg-blue-400"
            >
              {plan.btn}
            </button>
          </div>
        ))}
      </div>

      {/* STATUS */}
      <p className="text-center mt-10 text-green-500 font-mono">
        {isLoading ? "Processing..." : status}
      </p>

      {/* MODAL */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center
        transition-opacity duration-300
        ${modal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`bg-white w-[90%] max-w-md rounded-xl p-6
          transform transition-all duration-300
          ${modal ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Important Instructions</h3>
            <X className="cursor-pointer" onClick={() => setModal(false)} />
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Payment is in test mode. Use the credentials below:
          </p>

          <p><strong>Card:</strong> 4718 6091 0820 4366</p>
          <p><strong>CVV:</strong> 111</p>
          <p><strong>OTP:</strong> 123</p>
        </div>
      </div>
    </div>
  );
}
