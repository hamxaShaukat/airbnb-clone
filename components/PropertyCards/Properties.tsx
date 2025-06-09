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
import { Session } from "next-auth";

// ✅ Accept custom message in fallback UI
const FallbackUI = ({
  onReload,
  message = "The page is taking a while to load. Please try reloading.",
  title = "Oops! Taking longer than expected.",
}: {
  onReload: () => void;
  message?: string;
  title?: string;
}) => {
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
          {title}
        </motion.h1>
        <p className="text-xl text-emerald-400 mb-8">{message}</p>
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

const Properties = ({ session }: { session: Session | null }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeoutError, setTimeoutError] = useState<boolean>(false);

  const [emptyHotels, setEmptyHotels] = useState<boolean>(false); // ✅ New state
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
    setEmptyHotels(false); // ✅ Reset before fetch

    const timeout = setTimeout(() => {
      setTimeoutError(true);
      setLoading(false);
    }, 55000);

    try {
      const response = await axios.get("/api/hotels");
      clearTimeout(timeout);
      if (response.status === 200) {
        const data = response.data;
        if (Array.isArray(data) && data.length === 0) {
          setEmptyHotels(true); // ✅ Set if empty
        } else {
          setHotels(data);
        }
      } else {
        setError("Failed to fetch hotels.");
      }
    } catch (err) {
      setError("An error occurred while fetching hotels.");
    } finally {
      setLoading(false);
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    if (session) {
      fetchFvrts();
      fetchHotels();
    } else {
      fetchHotels();
    }
  }, [session]);

  // ✅ Show timeout error UI
  if (timeoutError) {
    return <FallbackUI onReload={() => window.location.reload()} />;
  }

  // ✅ Show no hotels UI
  if (!loading && emptyHotels) {
    return (
      <FallbackUI
        onReload={() => window.location.reload()}
        title="No Hotels Found"
        message="It looks like no hotels have been posted yet. Please check back later!"
      />
    );
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
