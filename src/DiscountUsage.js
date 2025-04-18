// src/DiscountUsage.js
import React, { useState } from 'react';
import axios from 'axios';

const DiscountUsage = () => {
  const [couponCode, setCouponCode] = useState('');
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!couponCode) {
      alert("Please enter a coupon code.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state before making the request.

    try {
      // Make the API request to your backend
      const response = await axios.get(`http://127.0.0.1:5000/api/discount-usage/${couponCode}`);
      setUsageData(response.data);
    } catch (err) {
      console.error("Error fetching discount usage:", err);
      setError("There was an error fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Coupon Code Usage</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="couponCode">Enter Coupon Code</label>
          <input
            type="text"
            id="couponCode"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder="Enter a discount code"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Get Orders'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {usageData && (
        <div className="orders-section">
          <h2>Discount Code: <span>{couponCode}</span></h2>
          <p>Used {usageData.count} times</p>
          <ul className="order-list">
            {usageData.orders.map((order) => (
              <li key={order.id} className="order-item">
                <div>
                  <strong>Order #{order.name}</strong>
                  <span className="order-price">₹{order.total_price}</span>
                </div>
                <p className="order-details">Customer: {order.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiscountUsage;
