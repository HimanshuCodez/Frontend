import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CheckCircle, Mail, Loader2, Package, Clock } from "lucide-react";

const OrderSuccess = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get(
          "https://backend-h759.onrender.com/api/v1/get-order-history",
          { headers }
        );
        
        if (response.data.data.length > 0) {
          setOrderId(response.data.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleSendInvoice = async () => {
    if (!orderId) {
      toast.error("No order found!");
      return;
    }

    setLoading(true);
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.post(
        "https://backend-h759.onrender.com/api/v1/send-invoice",
        { order_id: orderId },
        { headers }
      );

      if (response.data.success) {
        toast.success("Invoice sent to your email!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error sending invoice:", error);
      toast.error("Failed to send invoice. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          
          <h2 className="card-title text-2xl font-bold text-success mb-4">
            Order Successful!
          </h2>

          <div className="alert alert-success mb-6">
            <div>
              Thank you for your purchase! Your order has been successfully placed and confirmed.
            </div>
          </div>

          <div className="stats shadow mb-6">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Package className="w-8 h-8" />
              </div>
              <div className="stat-title">Order ID</div>
              <div className="stat-value text-primary text-lg">
                #{orderId ? orderId.slice(-8) : "Loading..."}
              </div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Clock className="w-8 h-8" />
              </div>
              <div className="stat-title">Status</div>
              <div className="stat-value text-secondary text-lg">Processing</div>
            </div>
          </div>

          <p className="text-base-content/80 mb-6">
            A confirmation email has been sent to your registered email address.
          </p>

          <button 
            className={`btn btn-primary w-full max-w-xs ${loading ? 'loading' : ''}`}
            onClick={handleSendInvoice}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Invoice...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Get Invoice
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;