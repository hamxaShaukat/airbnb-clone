"use client";
import useHotelId from "@/lib/features/hotelId";
import { Hotel } from "@/types/types";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Booking = () => {
  const { hotelId } = useHotelId();
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState<Hotel>();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/get-booking-hotel`);
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
    try {
      // call your booking API
      const response = await axios.post(`/api/add-booking`);
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
  return <div>Booking</div>;
};

export default Booking;
