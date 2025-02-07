import React, { useState } from "react";
import { Minus, Plus } from "lucide-react"; // Lucide icons for + and -

const QuantitySelector = ({ maxQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);
  
  // Handle increment
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Notify parent component
    }
  };

  // Handle decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Notify parent component
    }
  };

  return (
    <div className="join">
      {/* Minus Button */}
      <button
        onClick={handleDecrement}
        className="btn btn-outline join-item"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>

      {/* Quantity Input */}
      <input
        type="number"
        value={quantity}
        min="1"
        max={maxQuantity}
        readOnly
        className="input input-bordered join-item w-16 text-center"
        aria-label="Selected quantity"
      />

      {/* Plus Button */}
      <button
        onClick={handleIncrement}
        className="btn btn-outline join-item"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;