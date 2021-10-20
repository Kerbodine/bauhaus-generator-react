import React, { useEffect, useState } from "react";
import { BiErrorCircle, BiX } from "react-icons/bi";

export default function ColorInput({ index, value, setValue, deleteColor }) {
  const [validColor, setValidColor] = useState(null);

  useEffect(() => {
    if (/^([0-9A-F]{3}){1,2}$/i.test(value) === true) {
      setValidColor(true);
    } else {
      setValidColor(false);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-2 group">
      <div className="w-[6.5rem] h-8 relative">
        <div
          className={`absolute ml-1.5 mt-1.5 rounded-md w-5 h-5 bg-gray-500 text-white ${
            !validColor ? "!bg-gray-700 flex items-center justify-center" : ""
          }`}
          style={{ backgroundColor: "#" + value }}
        >
          {!validColor ? <BiErrorCircle /> : null}
        </div>
        <label className="absolute mt-1 ml-8 text-gray-500 font-bold">#</label>
        <input
          className="w-full h-8 rounded-md bg-gray-100 text-sm pl-11 pr-2 font-mono text-gray-500"
          placeholder="000000"
          autoFocus
          value={value}
          pattern="^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
          required
          onChange={(e) => {
            setValue(index, e);
          }}
        />
      </div>
      <div
        className="cursor-pointer text-gray-500 text-xl"
        onClick={(e) => deleteColor(index, e)}
      >
        <BiX />
      </div>
    </div>
  );
}
