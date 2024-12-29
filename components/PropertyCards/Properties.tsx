"use client";
import React, { useEffect, useState } from "react";
import Property from "@/constants/Property";
import SinglePropertCard from "./SinglePropertCard";
import axios from "axios";
import { Hotel } from "@/types/types";
import { ClipLoader } from "react-spinners";
import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const FallbackUI = ({ onReload }: { onReload: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-emerald-500 rounded-full"
            style={{
              width: Math.random() * 20 + 5,
              height: Math.random() * 20 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Oops! Taking longer than expected.
        </motion.h1>
        <p className="text-xl text-emerald-400 mb-8">
          The page is taking a while to load. Please try reloading.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="default"
            size="lg"
            onClick={onReload}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
            Reload Page
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Properties = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]); // State for hotels
  const [error, setError] = useState<string | null>(null); // State for error
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [timeoutError, setTimeoutError] = useState<boolean>(false);
  const [fvrtList, setFvrtList] = useState([]);

  const fetchFvrts = async () => {
    try {
      const response = await axios.get("/api/get-fvrt");
      if (
        response.status === 200 &&
        response.data &&
        Array.isArray(response.data.favorites)
      ) {
        setFvrtList(response.data.favorites);
      } else {
        setError("Failed to fetch favorites.");
      }
    } catch (err) {
      setError("An error occurred while fetching favorites.");
    }
  };

  const fetchHotels = async () => {
    setLoading(true);
    setTimeoutError(false);

    const timeout = setTimeout(() => {
      setTimeoutError(true);
      setLoading(false);
    }, 55000);

    try {
      const response = await axios.get("/api/hotels");
      clearTimeout(timeout);
      if (response.status === 200) {
        setHotels(response.data); // Store the hotels in state
      } else {
        setError("Failed to fetch hotels.");
      }
    } catch (err) {
      setError("An error occurred while fetching hotels.");
    } finally {
      setLoading(false); // Stop loading
      clearTimeout(timeout);
    }
  };
  console.log("first", fvrtList);

  useEffect(() => {
    fetchFvrts(); // Fetch favourites on component mount
    fetchHotels(); // Fetch hotels on component mount
  }, []);
  if (timeoutError) {
    return <FallbackUI onReload={() => window.location.reload()} />;
  }

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
            <SinglePropertCard
              key={index}
              property={property}
              favorites={fvrtList}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
