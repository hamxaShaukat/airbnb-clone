"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

interface Hotel {
  id: string;
  name: string;
}

export default function Insights() {
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]); // State for hotels
  const [error, setError] = useState<string | null>(null); // State for error
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching
  const [deleting, setDeleting] = useState<boolean>(false); // Loading state for deletion

  const fetchHotels = async () => {
    setLoading(true); // Show global loader
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
      setLoading(false); // Hide global loader
    }
  };

  const handleDeleteClick = async (id: string) => {
    setDeleting(true); // Show delete loader
    try {
      const response = await axios.delete("/api/delete-hotel", {
        data: { id: id },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Hotel deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setHotels((prevHotels) => prevHotels.filter((h) => h.id !== id)); // Update state
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to delete hotel",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "An error occurred while deleting the hotel",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setDeleting(false); // Hide delete loader
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchHotels(); // Fetch hotels on component mount
  }, []);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Hotel List</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4ade80" size={50} />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {hotels.map((hotel) => (
              <motion.li
                key={hotel.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
              >
                <span className="text-lg text-white">{hotel.name}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setHotelToDelete(hotel);
                    setIsDialogOpen(true);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete {hotelToDelete?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteClick(hotelToDelete!.id)}
              disabled={deleting}
            >
              {deleting ? (
                <ClipLoader color="#fff" size={15} />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
