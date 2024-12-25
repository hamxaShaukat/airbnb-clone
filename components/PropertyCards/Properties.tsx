"use client";
import React, { useEffect, useState } from "react";
import Property from "@/constants/Property";
import SinglePropertCard from "./SinglePropertCard";
import axios from "axios";
import { Hotel } from "@/types/types";
import { ClipLoader } from "react-spinners";

const Properties = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]); // State for hotels
  const [error, setError] = useState<string | null>(null); // State for error
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  const fetchHotels = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("/api/hotels");
      if (response.status === 200) {
        setHotels(response.data); // Store the hotels in state
      } else {
        console.error("Failed to fetch hotels, status:", response.status);
        setError("Failed to fetch hotels.");
      }
    } catch (err) {
      console.error("Error while fetching hotels:", err);
      setError("An error occurred while fetching hotels.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchHotels(); // Fetch hotels on component mount
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text">
        Discover Extraordinary Escapes
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
        <ClipLoader color="#4ade80" size={50} />
      </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {hotels.map((property, index) => (
            <SinglePropertCard key={index} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
