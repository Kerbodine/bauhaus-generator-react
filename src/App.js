import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import ColorInput from "./components/ColorInput";
import { ReactComponent as Placeholder } from "./placeholder.svg";

function App() {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [size, setSize] = useState(20);
  const [colors, setColors] = useState(["d4d4d4"]);

  const changeWidth = (e) => {
    setWidth(e.target.value);
  };

  const changeHeight = (e) => {
    setHeight(e.target.value);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };

  const updateColor = (index, e) => {
    let tempColors = colors;
    tempColors[index] = e.target.value;
    setColors([...tempColors]);
  };

  const addColor = () => {
    if (colors.length < 6) {
      setColors([...colors, ""]);
    }
  };

  const deleteColor = (index) => {
    let tempColors = colors;
    tempColors.splice(index, 1);
    setColors([...tempColors]);
  };

  return (
    <div className="App w-screen h-screen overflow-hidden p-4 sm:p-8 lg:p-16">
      <div className="w-full h-full bg-white border-2 border-gray-300 rounded-2xl p-8 flex flex-col md:flex-row gap-4 lg:gap-8 overflow-y-auto">
        <div className="p-4 pb-0">
          <h1 className="text-gray-700 font-semibold text-4xl">
            Bauhaus Pattern Generator
          </h1>
          <p className="text-gray-500 text-xl">Created by @Kerbodine</p>
          <div className="flex mt-4 gap-4 flex-wrap">
            <div>
              <label className="text-sm font-semibold block text-gray-500 mb-1">
                Width:
              </label>
              <input
                className="px-2 max-w-[6rem] min-w-[4rem] h-8 rounded-md bg-gray-100 text-gray-500"
                type="number"
                min="1"
                max="40"
                value={width}
                onChange={(e) => {
                  changeWidth(e);
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold block text-gray-500 mb-1">
                Height:
              </label>
              <input
                className="px-2 max-w-[6rem] min-w-[4rem] h-8 rounded-md bg-gray-100 text-gray-500"
                type="number"
                min="1"
                max="40"
                value={height}
                onChange={(e) => {
                  changeHeight(e);
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold block text-gray-500 mb-1">
                Size:
              </label>
              <input
                className="px-2 max-w-[6rem] min-w-[4rem] h-8 rounded-md bg-gray-100 text-gray-500"
                type="number"
                min="1"
                max="40"
                value={size}
                onChange={(e) => {
                  changeSize(e);
                }}
              />
            </div>
          </div>
          <label className="text-sm block font-semibold text-gray-500 mt-4 mb-1">
            Colors:
          </label>
          <div className="">
            <div className="flex flex-row md:flex-col flex-wrap -ml-7 -mr-4 gap-2">
              {colors.map((color, index) => (
                <ColorInput
                  key={index}
                  index={index}
                  value={color}
                  setValue={updateColor}
                  deleteColor={deleteColor}
                />
              ))}
            </div>
            <button
              className={`w-8 h-8 mt-2 rounded-md border-2 border-dashed hover:border-solid transition-all hover:bg-gray-100 border-gray-300 text-gray-300 text-2xl justify-center items-center ${
                colors.length > 5 ? "hidden" : "flex"
              }`}
              onClick={() => addColor()}
            >
              <BiPlus />
            </button>
          </div>
        </div>
        <div className="ml-auto w-full md:w-1/2 h-full max-w-[600px] max-h-[600px] border-2 rounded-2xl border-gray-300 flex items-center justify-center">
          <Placeholder className="w-48 h-48 p-4 min-w-[8rem] min-h-[8rem]" />
        </div>
      </div>
    </div>
  );
}

export default App;
