import { Menu, Transition } from "@headlessui/react";
import {
  BiDotsVerticalRounded,
  BiExport,
  BiImport,
  BiReset,
} from "react-icons/bi";
import { Fragment } from "react";

export default function Options({ fileReader, downloadConfig, resetConfig }) {
  return (
    <Menu as="div" className="relative ml-auto">
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
  );
}
