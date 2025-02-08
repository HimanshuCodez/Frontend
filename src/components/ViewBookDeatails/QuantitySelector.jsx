import React, { useState } from "react";
import { Minus, Plus } from "lucide-react"; // Lucide icons for + and -

const QuantitySelector = ({ maxQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg shadow-md w-fit">
      {/* Minus Button */}
      <button
        onClick={handleDecrement}
        className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50"
        disabled={quantity === 1}
        aria-label="Decrease quantity"
      >
        <Minus className="w-5 h-5" />
      </button>

      {/* Quantity Input */}
      <input
        type="number"
        value={quantity}
        min="1"
        max={maxQuantity}
        readOnly
        className="w-12 text-center font-semibold bg-white border border-gray-300 rounded-md"
        aria-label="Selected quantity"
      />

      {/* Plus Button */}
      <button
        onClick={handleIncrement}
        className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50"
        disabled={quantity === maxQuantity}
        aria-label="Increase quantity"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuantitySelector;
