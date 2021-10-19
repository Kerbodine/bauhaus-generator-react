import React from "react";
import { BiCheck } from "react-icons/bi";

export default function ShapeSelect(shape, selected, toggleSelect) {
  return (
    <div className="">
      <button
        className={`w-6 h-6 border-2 rounded-md border-gray-300 text-2xl text-white flex items-center justify-center ${
          selected ? "bg-gray-700 border-gray-700" : ""
        }`}
        onClick={() => {
          toggleSelect(shape);
        }}
      >
        {selected ? <BiCheck /> : null}
      </button>
    </div>
  );
}
