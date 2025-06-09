"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  Search,
  X,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Plus,
  Minus,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryList from "@/constants/CategoryList";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function Navbar({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roles, setRoles] = useState("");
  const [counts, setCounts] = useState({
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    guests: 0,
    pets: 0,
  });
  const doLogOut = async () => {
    await signOut();
  };
  const doLogin = async () =>{
    router.push('/login');
  }

  const features = {
    "Popular Amenities": [
      { icon: "🏊‍♂️", label: "Pool" },
      { icon: "🛀", label: "Hot tub" },
      { icon: "🅿️", label: "Free parking" },
      { icon: "🔌", label: "EV charger" },
      { icon: "🛏️", label: "King bed" },
      { icon: "💪", label: "Gym" },
    ],
    Essentials: [
      { icon: "🔥", label: "Indoor fireplace" },
      { icon: "🍳", label: "Kitchen" },
      { icon: "❄️", label: "Air conditioning" },
      { icon: "📶", label: "Wifi" },
      { icon: "👕", label: "Washer" },
      { icon: "📺", label: "TV" },
    ],
    Safety: [
      { icon: "🚨", label: "Smoke alarm" },
      { icon: "🧯", label: "Fire extinguisher" },
      { icon: "🔒", label: "Security cameras" },
      { icon: "🚪", label: "Private entrance" },
    ],
  };

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleCount = (key: keyof typeof counts, increment: boolean) => {
    setCounts((prev) => ({
      ...prev,
      [key]: increment ? prev[key] + 1 : Math.max(0, prev[key] - 1),
    }));
  };

  const categories = [
    "Technology",
    "Science",
    "Nature",
    "Sustainability",
    "Eco-Innovation",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
      ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      }
      ${
        isDarkMode
          ? "border-b border-emerald-600"
          : "border-b border-emerald-400"
      }
    `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <div
                  className={`absolute inset-0 ${
                    isDarkMode ? "bg-emerald-600" : "bg-emerald-400"
                  } rounded-full animate-pulse`}
                ></div>
                <svg
                  className="relative z-10 w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">Hamu TRVs</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl mx-4">
            <div className="relative group">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? "text-emerald-400" : "text-emerald-500"
                }`}
              />
              <Input
                className={`w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 border-2 ${
                  isDarkMode ? "border-emerald-600" : "border-emerald-400"
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out`}
                placeholder="Explore the ecosystem..."
                type="search"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center px-2 font-mono text-sm font-medium text-gray-400 bg-gray-700 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={`gap-2 bg-gray-800 ${
                  isDarkMode ? "border-emerald-600" : "border-emerald-400"
                } text-white hover:bg-emerald-600 hover:text-white transition-all duration-300`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter</span>
                {selectedFeatures.length > 0 && (
                  <Badge
                    variant="secondary"
                    className={`ml-2 ${
                      isDarkMode ? "bg-emerald-600" : "bg-emerald-400"
                    } text-white`}
                  >
                    {selectedFeatures.length}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] bg-gray-900 text-white border border-emerald-500 overflow-hidden flex flex-col">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle className="text-2xl font-bold text-emerald-400">
                  Filters
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto flex-grow pr-4 -mr-4">
                <div className="grid gap-6 py-4">
                  {/* Number Inputs */}
                  <div className="grid gap-4">
                    <h3 className="text-lg font-semibold text-emerald-400">
                      Property Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(counts).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-700"
                        >
                          <span className="capitalize">{key}</span>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className={`h-8 w-8 ${
                                isDarkMode
                                  ? "border-emerald-600"
                                  : "border-emerald-400"
                              } hover:bg-emerald-600`}
                              onClick={() =>
                                handleCount(key as keyof typeof counts, false)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-4 text-center">{value}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className={`h-8 w-8 ${
                                isDarkMode
                                  ? "border-emerald-600"
                                  : "border-emerald-400"
                              } hover:bg-emerald-600`}
                              onClick={() =>
                                handleCount(key as keyof typeof counts, true)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature Sections */}
                  {Object.entries(features).map(([category, items]) => (
                    <div key={category} className="grid gap-4">
                      <h3 className="text-lg font-semibold text-emerald-400">
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {items.map(({ icon, label }) => (
                          <button
                            key={label}
                            onClick={() => toggleFeature(label)}
                            className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                              selectedFeatures.includes(label)
                                ? `${
                                    isDarkMode
                                      ? "border-emerald-600 bg-emerald-600/20"
                                      : "border-emerald-400 bg-emerald-400/20"
                                  } text-white`
                                : "border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white"
                            }`}
                          >
                            <span>{icon}</span>
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Accordions */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="house-rules"
                      className="border-gray-700"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-emerald-400 hover:text-emerald-300">
                        House Rules
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {[
                            { icon: "🚭", label: "No smoking" },
                            { icon: "🐕", label: "Pets allowed" },
                            { icon: "🎉", label: "Events allowed" },
                            { icon: "👶", label: "Kids friendly" },
                          ].map(({ icon, label }) => (
                            <button
                              key={label}
                              onClick={() => toggleFeature(label)}
                              className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                                selectedFeatures.includes(label)
                                  ? `${
                                      isDarkMode
                                        ? "border-emerald-600 bg-emerald-600/20"
                                        : "border-emerald-400 bg-emerald-400/20"
                                    } text-white`
                                  : "border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white"
                              }`}
                            >
                              <span>{icon}</span>
                              <span>{label}</span>
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="accessibility"
                      className="border-gray-700"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-emerald-400 hover:text-emerald-300">
                        Accessibility
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {[
                            { icon: "♿", label: "Step-free entrance" },
                            { icon: "🛗", label: "Elevator" },
                            { icon: "🚽", label: "Accessible bathroom" },
                            { icon: "🅿️", label: "Accessible parking" },
                          ].map(({ icon, label }) => (
                            <button
                              key={label}
                              onClick={() => toggleFeature(label)}
                              className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                                selectedFeatures.includes(label)
                                  ? `${
                                      isDarkMode
                                        ? "border-emerald-600 bg-emerald-600/20"
                                        : "border-emerald-400 bg-emerald-400/20"
                                    } text-white`
                                  : "border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-white"
                              }`}
                            >
                              <span>{icon}</span>
                              <span>{label}</span>
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Select>
            <SelectTrigger
              className={`w-[200px] border ${
                isDarkMode ? "border-emerald-600" : "border-emerald-400"
              }`}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {CategoryList.map((category) => (
                  <SelectItem key={category.label} value={category.label}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={category.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="invert"
                      />
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Menu Icon and Sidebar */}
          <div className="flex-shrink-0">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-white hover:bg-emerald-600 ${
                    isDarkMode ? "border-emerald-600" : "border-emerald-400"
                  } hover:text-white transition-colors duration-300`}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={`w-[300px] sm:w-[400px] bg-gray-900 text-white ${
                  isDarkMode
                    ? "border-l border-emerald-600"
                    : "border-l border-emerald-400"
                }`}
              >
                <nav className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-emerald-400">
                      Explore
                    </h2>
                  </div>
                  <ul className="space-y-4 flex-grow">
                    <li>
                      <a
                        href="/"
                        className="group flex items-center py-2 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-emerald-600 transition-all duration-300 ease-in-out"
                      >
                        <span>Home</span>
                        <ChevronRight className="ml-auto h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/favorites"
                        className="group flex items-center py-2 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-emerald-600 transition-all duration-300 ease-in-out"
                      >
                        <span>Favourites</span>
                        <ChevronRight className="ml-auto h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={
                          session?.user.role === "host"
                            ? "/listing"
                            : "/become-a-host"
                        }
                        className="group flex items-center py-2 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-emerald-600 transition-all duration-300 ease-in-out"
                      >
                        <span>
                          {session?.user.role === "guest"
                            ? "Become a host"
                            : "Host a hotel"}
                        </span>
                        <ChevronRight className="ml-auto h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </li>
                    {session?.user.role === "host" ? (
                      <li>
                        <a
                          href="/insights"
                          className="group flex items-center py-2 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-emerald-600 transition-all duration-300 ease-in-out"
                        >
                          <span>Insights</span>
                          <ChevronRight className="ml-auto h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      {session ? (
                        <div
                          className="group flex gap-x-4 items-center py-2 px-4 rounded-lg text-gray-300 hover:text-white cursor-pointer hover:bg-emerald-600 transition-all duration-300 ease-in-out"
                          onClick={doLogOut}
                        >
                          <Image
                            src={session?.user?.image ?? ""}
                            alt="logo"
                            className='rounded-full'
                            height={30}
                            width={30}
                          />
                          <span>Log out</span>
                          <LogOut className="ml-auto h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      ) : (
                        <div
                          className="group flex gap-x-4 items-center py-2 px-4 rounded-lg text-gray-300 hover:text-white cursor-pointer hover:bg-emerald-600 transition-all duration-300 ease-in-out"
                          onClick={doLogin}
                        >
                         
                          <span>Log in</span>
                          <LogOut className="ml-auto h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      )}
                    </li>
                  </ul>

                  <div className="mt-auto pb-4">
                    <p className="text-sm text-gray-400">
                      © 2024 Hamu TRVs. All rights reserved.
                    </p>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
