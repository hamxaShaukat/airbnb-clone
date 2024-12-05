"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Bed,
  ShowerHeadIcon as Shower,
  DollarSign,
  Users,
  Baby,
  Dog,
} from "lucide-react";
import Image from "next/image";

const images = [
  "/assets/ph1.jpg",
  "/assets/ph2.jpg",
  "/assets/ph3.jpg",
  "/assets/ph4.jpg",
  "/assets/ph5.jpg",
];

const reviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    comment: "Excellent property, highly recommended!",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    comment: "Great location and amenities.",
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 5,
    comment: "Fantastic experience, will definitely come back.",
  },
  {
    id: 4,
    author: "Sarah Brown",
    rating: 4,
    comment: "Very comfortable and clean.",
  },
  {
    id: 5,
    author: "Chris Lee",
    rating: 5,
    comment: "Amazing views and excellent service.",
  },
  {
    id: 6,
    author: "Emily Davis",
    rating: 4,
    comment: "Lovely property with great facilities.",
  },
  {
    id: 7,
    author: "David Wilson",
    rating: 5,
    comment: "Perfect for a family vacation.",
  },
  {
    id: 8,
    author: "Lisa Taylor",
    rating: 4,
    comment: "Enjoyed our stay, minor issues but overall good.",
  },
  {
    id: 9,
    author: "Robert Anderson",
    rating: 5,
    comment: "Exceptional property and host.",
  },
  {
    id: 10,
    author: "Jennifer White",
    rating: 4,
    comment: "Beautiful location, slightly overpriced.",
  },
];

const rules = [
  "Check-in time is 2:00 PM",
  "Check-out time is 11:00 AM",
  "No smoking inside the property",
  "No parties or events",
  "Pets allowed (with additional fee)",
];

const facilities = [
  "Free Wi-Fi",
  "Air conditioning",
  "Fully equipped kitchen",
  "Washing machine",
  "Private parking",
  "Swimming pool",
  "Gym",
  "BBQ area",
];

export default function PropertyDetails() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleGuestChange = (type: keyof typeof guests, value: number) => {
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, value) }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-100">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
          {images.map((src, idx) => (
            <div key={idx} className="keen-slider__slide">
              <Image
                src={src}
                alt={`Property image ${idx + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/75"
              onClick={() => instanceRef.current?.prev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/75"
              onClick={() => instanceRef.current?.next()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4">
          <Card className="bg-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Guest Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-700 pb-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{review.author}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/4">
          <Card className="bg-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Property Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>Beds</span>
                  </div>
                  <span>4</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shower className="h-5 w-5 mr-2" />
                    <span>Bathrooms</span>
                  </div>
                  <span>4</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Price per Adult</span>
                  </div>
                  <span>$89</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Price per Child</span>
                  </div>
                  <span>$80</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Price per Infant</span>
                  </div>
                  <span>$0</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="adults">Adults</Label>
                  <div className="flex items-center mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-emerald-500 text-black"
                      size="icon"
                      onClick={() =>
                        handleGuestChange("adults", guests.adults - 1)
                      }
                    >
                      -
                    </Button>
                    <Input
                      id="adults"
                      type="number"
                      value={guests.adults}
                      onChange={(e) =>
                        handleGuestChange("adults", parseInt(e.target.value))
                      }
                      className="mx-2 w-40 text-center bg-gray-700 border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() =>
                        handleGuestChange("adults", guests.adults + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="children">Children</Label>
                  <div className="flex items-center mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() =>
                        handleGuestChange("children", guests.children - 1)
                      }
                    >
                      -
                    </Button>
                    <Input
                      id="children"
                      type="number"
                      value={guests.children}
                      onChange={(e) =>
                        handleGuestChange("children", parseInt(e.target.value))
                      }
                      className="mx-2 w-40 text-center bg-gray-700 border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() =>
                        handleGuestChange("children", guests.children + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="infants">Infants</Label>
                  <div className="flex items-center mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() =>
                        handleGuestChange("infants", guests.infants - 1)
                      }
                    >
                      -
                    </Button>
                    <Input
                      id="infants"
                      type="number"
                      value={guests.infants}
                      onChange={(e) =>
                        handleGuestChange("infants", parseInt(e.target.value))
                      }
                      className="mx-2 w-40 text-center bg-gray-700 border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() =>
                        handleGuestChange("infants", guests.infants + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="pets">Pets</Label>
                  <div className="flex items-center mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() => handleGuestChange("pets", guests.pets - 1)}
                    >
                      -
                    </Button>
                    <Input
                      id="pets"
                      type="number"
                      value={guests.pets}
                      onChange={(e) =>
                        handleGuestChange("pets", parseInt(e.target.value))
                      }
                      className="mx-2 w-40 text-center bg-gray-700 border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() => handleGuestChange("pets", guests.pets + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full pt-14">
                <Button className="w-full bg-emerald-500 text-black">
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">House Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
