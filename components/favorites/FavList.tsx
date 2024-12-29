"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  RefreshCw,
  HeartOff,
  CircleArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { Hotel } from "@/types/types";
import useHotelId from "@/lib/features/hotelId";
import { useRouter } from "next/navigation";

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
          The page is taking a while to load. Kindly check your internet
          connection and try again, or Please try reloading.
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

export default function FavList() {
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [timeoutError, setTimeoutError] = useState<boolean>(false);
  const [favIds,setFaveIds]=useState<string[]>()
  const {setHotelId} = useHotelId();
const router =useRouter();
  const routePage = (id: string) => {
    setHotelId(id);
    router.push(`/hotel/${id}`);
  }
  const fetchHotels = async () => {
    setLoading(true);
    setTimeoutError(false);

    const timeout = setTimeout(() => {
      setTimeoutError(true);
      setLoading(false);
    }, 55000);

    try {
      // Step 1: Fetch favorite hotel IDs
      const favoriteResponse = await axios.get("/api/get-fvrt");
      if (favoriteResponse.status !== 200) {
        setError("Failed to fetch favorite list.");
        clearTimeout(timeout);
        // setLoading(false);
        return;
      }
      const favoriteIds: string[] = favoriteResponse.data?.favorites || [];
      setFaveIds(favoriteIds)
      // Step 2: Fetch all hotels
      const hotelsResponse = await axios.get("/api/hotels");
      clearTimeout(timeout);

      if (hotelsResponse.status === 200) {
        const allHotels: Hotel[] = hotelsResponse.data;

        // Step 3: Filter hotels based on favorite IDs
        const favoriteHotels = allHotels.filter((hotel) =>
          favoriteIds.includes(hotel.id)
        );

        setHotels(favoriteHotels);
      } else {
        setError("Failed to fetch hotels.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
      clearTimeout(timeout);
    }
  };

  const handleDeleteClick = async (id: string) => {
    setDeleting(true);
    try {
      const response = await axios.delete("/api/delete-fvrt-hotel", {
        data: { id: id },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Hotel deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setHotels((prevHotels) => prevHotels.filter((h) => h.id !== id));
        window.location.reload();
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
      setDeleting(false);
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);


  if (loading) {
    console.log('hjjhjhjhjhjhjj')
    return (
      <div className="flex h-screen bg-gray-800 flex-col items-center justify-center gap-y-6">
       <ClipLoader color="#4ade80" size={50} />
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="flex bg-gray-800 h-screen flex-col items-center justify-center gap-y-6">
        <span className="text-red-400">
          <HeartOff className="h-12 w-12" />
        </span>
        <p className="text-center text-3xl font-black text-white">
          No favorite hotels found.
        </p>
        <p className="text-center text-emerald-400">
          Add some favorites to see your list.
        </p>
      </div>
    );
  }

  if (timeoutError) {
    return <FallbackUI onReload={() => window.location.reload()} />;
  }

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
                <div className="flex gap-x-4">
                  <Image
                    src={hotel.images[0]}
                    alt="logo"
                    height={40}
                    width={40}
                    className="rounded-md"
                  />
                  <span className="text-lg text-white capitalize">
                    {hotel.name}
                  </span>
                </div>
                <div className="flex gap-x-4 items-center">
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
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      routePage(hotel.id);
                    }}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    <CircleArrowOutUpRight className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                </div>
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
              {deleting ? <ClipLoader color="#fff" size={15} /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
