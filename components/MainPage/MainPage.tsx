"use client";

import { useEffect, useState } from "react";
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
  CalendarDays,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import useHotelId from "@/lib/features/hotelId";
import { Hotel } from "@/types/types";
import { ClipLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const { hotelId } = useHotelId();
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState<Hotel>();

  let arePetsAllowed = hotel?.petRent !== undefined && hotel?.petRent > 0;
  console.log("yes", arePetsAllowed);
  const getData = async () => {
    setLoading(true);
    const data = localStorage.getItem("hotelId-storage");
    let hId = ""; // Initialize hId to ensure it's in scope

    if (data) {
      const parsedData = JSON.parse(data);
      hId = parsedData.state.hotelId; // Assign extracted ID to hId
      console.log("Extracted hId:", hId); // Debugging log
    }

    try {
      const response = await axios.post(`/api/get-booking-hotel`, {
        hId,
      });
      if (response.status === 200) {
        setHotel(response.data.hotel);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBook = async () => {
    setLoading(true);
    handleCheckOutDateChange(checkInDate);
    const id = hotel?.id;
    try {
      // call your booking API
      const response = await axios.post(`/api/my-add-booking`, {
        hotelId: id,
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        pets: guests.pets,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        totalPrice: totalPriceAfterDay,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Booking successful!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Booking failed!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to book, please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [numberOfdays, setNumberOfDays] = useState(1);
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");

  const handleCheckOutDateChange = (value: string) => {
    if (!value) {
      console.error("Invalid date value");
      return;
    }

    const checkoutDate = new Date(value); // Parse the input value as a Date
    // const checkindate = new Date(value); // Parse the input value as a Date

    if (isNaN(checkoutDate.getTime())) {
      console.error("Invalid date format");
      return;
    }

    checkoutDate.setDate(checkoutDate.getDate() + numberOfdays); // Add the number of days
    // checkindate.setDate(checkindate.getDate())
    // Format the date as "YYYY-MM-DD" and update the state
    setCheckOutDate(checkoutDate.toISOString().split("T")[0]);
    // setCheckInDate(checkindate.toISOString().split("T")[0]);
  };

  const handleDate = () => handleCheckOutDateChange(checkInDate);

  const handleDaysChange = (value: number) => {
    setNumberOfDays(Math.max(1, value));
  };
  console.log(checkInDate,checkOutDate)
  const totalPrice =
    (hotel?.adultRent || 0) +
    guests.children * (hotel?.childrenRent || 0) +
    guests.infants * (hotel?.infantsRent || 0) +
    guests.pets * (hotel?.petRent || 0);

  const totalPriceAfterDay = totalPrice * numberOfdays;
  const handleGuestChange = (type: keyof typeof guests, value: number) => {
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, value) }));
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 flex justify-center items-center h-screen">
        <ClipLoader color="#16a085" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-100">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
          {hotel?.images.map((src, idx) => (
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
                {hotel?.reviews === undefined ? (
                  <p>No reviews available.</p> // Render this if reviews are undefined
                ) : (
                  hotel.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-700 pb-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">
                          {review.userEmail ?? "anonymous"}
                        </h3>
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
                  ))
                )}
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
                  <span>{hotel?.Bedrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shower className="h-5 w-5 mr-2" />
                    <span>Bathrooms</span>
                  </div>
                  <span>{hotel?.Washrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Price per Adult</span>
                  </div>
                  <span>{hotel?.adultRent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Price per Child</span>
                  </div>
                  <span>{hotel?.childrenRent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Price per Infant</span>
                  </div>
                  <span>{hotel?.infantsRent}</span>
                </div>
                {arePetsAllowed ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      <span>Price per pet</span>
                    </div>
                    <span>{hotel?.petRent}</span>
                  </div>
                ) : (
                  ""
                )}
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
                {arePetsAllowed ? (
                  <div>
                    <Label htmlFor="pets">Pets</Label>
                    <div className="flex items-center mt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="bg-emerald-500 text-black"
                        onClick={() =>
                          handleGuestChange("pets", guests.pets - 1)
                        }
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
                        onClick={() =>
                          handleGuestChange("pets", guests.pets + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <Label htmlFor="days">Days</Label>
                  <div className="flex items-center mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() => handleDaysChange(numberOfdays - 1)}
                    >
                      -
                    </Button>
                    <Input
                      id="days"
                      type="number"
                      value={numberOfdays}
                      onChange={(e) =>
                        handleDaysChange(parseInt(e.target.value) || 1)
                      }
                      className="mx-2 w-40 text-center bg-gray-700 border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-emerald-500 text-black"
                      onClick={() => handleDaysChange(numberOfdays + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Total Guests</span>
                </div>
                <span>{guests.adults + guests.children + guests.infants}</span>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>Total Price</span>
                </div>
                <span>{totalPriceAfterDay}</span>
              </div>
              <div className="w-full pt-14">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button disabled={hotel?.isBooked} className="w-full bg-emerald-500 text-black">
                      {hotel?.isBooked?'Already book':'Book Now'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Finaliz your Check in</DialogTitle>
                      <DialogDescription>
                        Make sure to <b> review </b>your <b>booking</b> details
                        before continuing. And make sure to pay{" "}
                        <b>dues for your booking</b> while recieving keys or you
                        will not be able to get keys.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                      <div className="flex justify-between items-center w-full">
                        <span className="flex gap-x-2">
                          <Users className="h-5 w-5 mr-2" />
                          Total Guests
                        </span>
                        <span>
                          {guests.adults + guests.children + guests.infants}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <span className="flex gap-x-2">
                          <CalendarDays className="h-5 w-5 mr-2" />
                          Number of days
                        </span>
                        <span>{numberOfdays}</span>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <span className="flex gap-x-2">
                          <DollarSign className="h-5 w-5 mr-2" />
                          Total Price
                        </span>
                        <span>{totalPriceAfterDay}</span>
                      </div>
                     
                      {checkInDate === "" ? (
                        <div className="flex justify-between items-center w-full">
                          <span className="flex gap-x-2">
                            <Calendar className="h-5 w-5 mr-2" />
                            Check in
                          </span>
                          <span>
                            <Input
                              type="date"
                              value={checkInDate}
                              onChange={(e) => {
                                setCheckInDate(e.target.value);
                                handleCheckOutDateChange(e.target.value);
                              }}
                            />
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center w-full">
                        <span className="flex gap-x-2">
                          <Calendar className="h-5 w-5 mr-2" />
                          check in
                        </span>
                        <span>{checkInDate}</span>
                      </div>
                      )}
                       <div className="flex justify-between items-center w-full">
                        <span className="flex gap-x-2">
                          <Calendar className="h-5 w-5 mr-2" />
                          check out
                        </span>
                        <span>{checkOutDate}</span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBook();
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
              {hotel?.rules.map((rule, index) => (
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
              {hotel?.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
