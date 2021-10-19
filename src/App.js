import { useEffect, useRef, useState } from "react";
import {
  BiDownArrow,
  BiDownArrowCircle,
  BiDownload,
  BiPlus,
} from "react-icons/bi";
import ColorInput from "./components/ColorInput";
import ShapeSelect from "./components/ShapeSelect";
import { ReactComponent as Placeholder } from "./placeholder.svg";
import {
  square,
  vSquare,
  hSquare,
  cornerSquare,
  circle,
  diamond,
  quarterCircle,
  dots,
  semiCircles,
  hSemiCircles,
  vSemiCircles,
} from "./Shapes";

function App() {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [size, setSize] = useState(20);
  const [colors, setColors] = useState(["d4d4d4"]);
  const [svg, setSvg] = useState(null);
  const svgWrapperRef = useRef();

  const [shapeSettings, setShapeSettings] = useState({
    square: true,
    vSquare: true,
    hSquare: true,
    cornerSquare: true,
    circle: true,
    diamond: true,
    quarterCircle: true,
    dots: true,
    semiCircles: true,
    hSemiCircles: true,
    vSemiCircles: true,
  });

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

  const addColor = (e) => {
    e.preventDefault();
    if (colors.length < 6) {
      setColors([...colors, ""]);
    }
  };

  const deleteColor = (index, e) => {
    e.preventDefault();
    let tempColors = colors;
    tempColors.splice(index, 1);
    setColors([...tempColors]);
  };

  const randomBetween = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  const randomColor = () => {
    return "#" + colors[Math.floor(Math.random() * colors.length)];
  };

  const randomBool = () => {
    return Math.random() < 0.5;
  };

  const generatePattern = (e) => {
    e.preventDefault();
    let svg;
    const shapes = [
      square,
      vSquare,
      hSquare,
      cornerSquare,
      circle,
      diamond,
      quarterCircle,
      dots,
      semiCircles,
      hSemiCircles,
      vSemiCircles,
    ];

    const randomShape = (size, randomBetween, randomColor, randomBool) => {
      return shapes[Math.floor(Math.random() * shapes.length)](
        size,
        randomBetween,
        randomColor,
        randomBool
      );
    };

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        svg += `
        <g transform="matrix(1,0,0,1,${j * size},${
          i * size
        })" style="clip-path: url(#square); ">
          ${randomShape(size, randomBetween, randomColor, randomBool)}
        </g>
      `;
      }
    }
    setSvg(`<svg width="100%" height="100%" viewBox="0 0 ${width * size} ${
      height * size
    }" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="square">
          <rect width="${size}" height="${size}" />
        </clipPath>
      </defs>
      ${svg}
    </svg>`);
  };

  const fileDownload = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const downloadSVG = (e) => {
    e.preventDefault();
    const file = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    ${svg}`;
    fileDownload("output.svg", file);
  };

  useEffect(() => {
    if (svg !== null) {
      svgWrapperRef.current.innerHTML = svg;
    }
  }, [svg]);

  return (
    <div className="App w-screen h-screen overflow-hidden p-4 sm:p-8 lg:p-16">
      <div className="w-full h-full bg-white border-2 border-gray-300 rounded-2xl p-8 flex flex-col md:flex-row gap-4 lg:gap-8 overflow-y-auto">
        <div className="pl-4 pt-4 pr-4 md:pr-0 md:pt-8 md:pl-8 lg:overflow-y-auto lg:overflow-x-hidden">
          <h1 className="text-gray-700 font-semibold text-4xl">
            Bauhaus Pattern Generator
          </h1>
          <p className="text-gray-500 text-xl">Created by @Kerbodine</p>
          <form>
            <div className="flex mt-4 gap-4 flex-wrap">
              <div>
                <label className="text-sm font-semibold block text-gray-500 mb-1">
                  Width:
                </label>
                <input
                  required
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
                  required
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
                  required
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
            <div className="flex flex-col xs:flex-row gap-8 md:gap-0">
              <div className="w-full md:w-1/2">
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
                  onClick={(e) => addColor(e)}
                >
                  <BiPlus />
                </button>
              </div>
              <div className="w-full md:w-1/2 ml-auto">
                {Object.keys(shapeSettings).map((shape) => (
                  <ShapeSelect shape={shape} selected={shapeSettings[shape]} />
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="px-4 h-10 bg-gray-700 rounded-md text-white hover:bg-gray-500"
                onClick={(e) => generatePattern(e)}
              >
                Generate
              </button>
              {svg ? (
                <button
                  className="w-10 h-10 bg-gray-700 rounded-md text-white hover:bg-gray-500 text-2xl flex items-center justify-center"
                  onClick={(e) => downloadSVG(e)}
                >
                  <BiDownArrowCircle />
                </button>
              ) : null}
            </div>
          </form>
        </div>
        <div className="ml-auto w-full md:w-1/2 h-full max-w-[600px] max-h-[600px] min-h-[240px] border-2 rounded-2xl border-gray-300 flex items-center justify-center overflow-hidden">
          {!svg ? (
            <Placeholder className="w-48 h-48 p-4 min-w-[8rem] min-h-[8rem]" />
          ) : (
            <div
              ref={svgWrapperRef}
              className="result-container relative w-full h-full"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
