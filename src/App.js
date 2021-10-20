import { Fragment, useEffect, useRef, useState } from "react";
import {
  BiDotsVerticalRounded,
  BiDownArrowCircle,
  BiExport,
  BiImport,
  BiPlus,
  BiReset,
} from "react-icons/bi";
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
import { Menu, Transition } from "@headlessui/react";

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
    const file = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    ${svg}`;
    fileDownload("output.svg", file);
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
    <div className="App w-screen h-screen overflow-hidden p-4 sm:p-8">
      <div className="w-full h-full bg-white border-2 border-gray-300 rounded-2xl p-8 flex flex-col md:flex-row overflow-y-auto">
        <div className="pl-4 pt-4 pr-4 pb-4 md:pb-0 md:pr-8 md:pt-8 md:pl-8 lg:overflow-y-auto lg:overflow-x-hidden">
          <div className="flex w-full">
            <h1 className="text-gray-700 font-semibold text-4xl leading-8 mb-2 mr-4">
              Bauhaus Pattern Generator
            </h1>
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="w-8 h-8 flex items-center justify-center text-2xl text-white rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none">
                  <BiDotsVerticalRounded />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md border-2 border-gray-300 focus:outline-none">
                  <div className="p-2">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-gray-700 text-white" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-1.5 py-1.5 text-sm`}
                          onClick={() => {
                            fileReader.current.click();
                          }}
                        >
                          <BiImport
                            className={`text-2xl mr-1 ${
                              active ? "text-white" : "text-gray-700"
                            }`}
                          />
                          Import config
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-gray-700 text-white" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-1.5 py-1.5 text-sm`}
                          onClick={downloadConfig}
                        >
                          <BiExport
                            className={`text-2xl mr-1 ${
                              active ? "text-white" : "text-gray-700"
                            }`}
                          />
                          Export config
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="p-2">
                    <Menu.Item>
                      {({ active, disabled }) => (
                        <button
                          className={`${
                            active ? "bg-gray-700 text-white" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-1.5 py-1.5 text-sm`}
                          onClick={resetConfig}
                        >
                          <BiReset
                            className={`text-2xl mr-1 ${
                              active ? "text-white" : "text-gray-700"
                            }`}
                          />
                          Reset
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
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
