import React from "react";

export default function InputLabel({ text }) {
  return (
    <label className="text-sm font-semibold block text-gray-500 mb-1">
      {text}
    </label>
  );
}
