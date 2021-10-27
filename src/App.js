import { useEffect, useRef, useState } from "react";
import { BiDownArrowCircle, BiPlus } from "react-icons/bi";
import ColorInput from "./components/ColorInput";
import InputLabel from "./components/InputLabel";
import NumericalInput from "./components/NumericalInput";
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
import Options from "./components/Options";

function App() {
  const [width, setWidth] = useState(
    localStorage.getItem("dimensions")
      ? JSON.parse(localStorage.getItem("dimensions"))[0]
      : 8
  );
  const [height, setHeight] = useState(
    localStorage.getItem("dimensions")
      ? JSON.parse(localStorage.getItem("dimensions"))[1]
      : 8
  );
  const [size, setSize] = useState(
    localStorage.getItem("dimensions")
      ? JSON.parse(localStorage.getItem("dimensions"))[2]
      : 20
  );
  const [colors, setColors] = useState(
    localStorage.getItem("colors")
      ? JSON.parse(localStorage.getItem("colors"))
      : ["D4D4D4"]
  );
  const [svg, setSvg] = useState(null);
  const svgWrapperRef = useRef();
  const fileReader = useRef(null);
  const [error, setError] = useState(false);

  const changeWidth = (e) => {
    setWidth(e.target.value);
  };

  const changeHeight = (e) => {
    setHeight(e.target.value);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };

  // Update color value in palette
  const updateColor = (index, e) => {
    let tempColors = colors;
    tempColors[index] = e.target.value.replace("#", "");
    setColors([...tempColors]);
  };

  // Add color to palette
  const addColor = (e) => {
    e.preventDefault();
    if (colors.length < 6) {
      setColors([...colors, ""]);
    }
  };

  // Delete color from palette
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

  // Generate pattern function
  const generatePattern = (e) => {
    e.preventDefault();
    let svg;
    // Array of all shape functions
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

    // Function to return random shape draw function
    const randomShape = (size, randomBetween, randomColor, randomBool) => {
      return shapes[Math.floor(Math.random() * shapes.length)](
        size,
        randomBetween,
        randomColor,
        randomBool
      );
    };

    // Main svg loop
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
    setSvg(`<svg role="img" width="100%" height="100%" viewBox="0 0 ${
      width * size
    } ${height * size}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="square">
          <rect width="${size}" height="${size}" />
        </clipPath>
      </defs>
      ${svg}
    </svg>`);
  };

  // File download function
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

  // Adds boilerplate code to svg and downloads it client side
  const downloadSVG = (e) => {
    e.preventDefault();
    fileDownload("output.svg", svg);
  };

  // Initialize file input and read json file contents
  const readConfig = (e) => {
    const file = e.target.files[0];
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      var result = JSON.parse(fr.result);
      console.log(result);
      !isNaN(result.width) ? setWidth(result.width) : setError(true);
      !isNaN(result.height) ? setHeight(result.height) : setError(true);
      !isNaN(result.size) ? setSize(result.size) : setError(true);
      setColors(result.colors);
    });
    fr.readAsText(file);
  };

  const downloadConfig = (e) => {
    const file = `{
  "width": ${width},
  "height": ${height},
  "size": ${size},
  "colors": ${JSON.stringify(colors)}
}`;
    fileDownload("config.json", file);
  };

  const resetConfig = () => {
    setWidth(8);
    setHeight(8);
    setSize(20);
    setColors([]);
  };

  useEffect(() => {
    if (svg !== null) {
      svgWrapperRef.current.innerHTML = svg;
    }
  }, [svg]);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    localStorage.setItem("dimensions", JSON.stringify([width, height, size]));
  }, [width, height, size]);

  return (
    <div className="App w-screen h-screen overflow-hidden p-4 flex sm:items-center justify-center">
      <div className="app-container">
        <div className="result-box">
          {!svg ? (
            <Placeholder className="w-48 h-48 p-4 min-w-[8rem] min-h-[8rem]" />
          ) : (
            <div
              ref={svgWrapperRef}
              className="result-container relative w-full h-full"
            ></div>
          )}
        </div>
        <div className="md:pb-0 lg:overflow-y-auto lg:overflow-x-hidden w-full">
          <div className="flex">
            <h1 className="text-gray-700 font-semibold text-4xl leading-8 mb-2 mr-4">
              Bauhaus Pattern Generator
            </h1>
            <Options
              fileReader={fileReader}
              downloadConfig={downloadConfig}
              resetConfig={resetConfig}
            />
          </div>
          <p className="text-gray-500 text-md">
            Created by
            <a
              href="https://www.michaelytong.com/"
              target="_blank"
              rel="noreferrer"
              className="p-1 underline rounded-md hover:bg-gray-700 hover:text-white"
            >
              @Kerbodine
            </a>
            {" | "}
            <a
              href="https://github.com/Kerbodine/bauhaus-generator-react"
              target="_blank"
              rel="noreferrer"
              className="p-1 underline rounded-md hover:bg-gray-700 hover:text-white"
            >
              Github
            </a>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex mt-4 gap-4 flex-wrap">
              <div>
                <InputLabel text="Width:" />
                <NumericalInput value={width} onChange={changeWidth} />
              </div>
              <div>
                <InputLabel text="Height:" />
                <NumericalInput value={height} onChange={changeHeight} />
              </div>
              <div>
                <InputLabel text="Cell size:" />
                <NumericalInput value={size} onChange={changeSize} />
              </div>
            </div>
            <div className="mt-4">
              <InputLabel text="Colors:" />
              <div className="flex flex-row md:flex-col flex-wrap gap-2">
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
      </div>
      <input
        type="file"
        accept=".json"
        className="hidden"
        ref={fileReader}
        onChange={readConfig}
      />
    </div>
  );
}

export default App;
