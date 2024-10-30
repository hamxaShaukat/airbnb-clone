import { CircleUserRound, Earth, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-x-2 cursor-pointer p-2 rounded-3xl">
        <div className="h-8 w-8">
          <img src="/assets/logo.png" className="w-full" />
        </div>
        <div className="text-2xl bg-gradient-to-r from-green-500 via-green-600 to-emerald-500 bg-clip-text text-transparent font-bold">
          Hamu trvs
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="text-xl text-black font-semibold cursor-pointer hover:bg-slate-200 p-2 rounded-3xl">Stays</div>
        <div className="text-xl text-neutral-600 cursor-pointer hover:bg-slate-200 p-2 rounded-3xl">Experience</div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="text-center text-lg text-neutral-700 cursor-pointer hover:bg-slate-200 p-2 rounded-3xl">Live like your home</div>
        <div className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 p-2 rounded-3xl">
          <Earth />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center w-full p-2 rounded-3xl border border-gray-600 gap-x-2 cursor-pointer hover:bg-slate-200">
              <div className="h-8 w-8 flex items-center justify-center">
                <Menu />
              </div>
              <div className="h-8 w-8 flex items-center justify-center">
                <CircleUserRound />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem className="font-semibold">Sign up</DropdownMenuItem>
              <DropdownMenuItem className="">Log in</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Rent a room</DropdownMenuItem>
              <DropdownMenuItem>Host an experience</DropdownMenuItem>
              <DropdownMenuItem>Help center</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
