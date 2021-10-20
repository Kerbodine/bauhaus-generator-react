import React from "react";

export default function NumericalInput({ value, onChange }) {
  return (
    <input
      required
      className="px-2 max-w-[6rem] min-w-[4rem] h-8 rounded-md bg-gray-100 text-gray-500"
      type="number"
      min="1"
      max="40"
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
}
