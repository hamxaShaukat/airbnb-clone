/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlignJustify, CircleUserRound, Globe } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full py-6 px-[4vw]">
      <div className="flex justify-between items-center">
        <div>
         <Image className="" src="/img/logo.png" alt="logo" width={150} height={150} />
        </div>
        <div className="flex ml-[10vw] px-[2vw] gap-x-10">
          <div className="text-slate-800 font-serif text-2xl">Stays</div>
          <div className="text-slate-800 font-serif text-2xl">Experience</div>
        </div>
        <div className="flex gap-x-[4]">
          <div className="text-xl font-medium">Airbnb your home</div>
          <div>
            <Globe />
          </div>
          <div className="">
            <Menu>
              <MenuButton className="flex items-center gap-4">
                <div>
                  <AlignJustify />
                </div>
                <div>
                  <CircleUserRound />
                </div>
              </MenuButton>

              <MenuItems className="w-52 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm/6 text-black shadow-lg focus:outline-none transition duration-100 ease-out">
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-slate-200">
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-slate-200">
                    Duplicate
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-gray-200" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-slate-200">
                    Archive
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-slate-200">
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
