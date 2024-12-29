import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HotelIdState {
    hotelId: string;
    setHotelId: (hotelId: string) => void;
}

const useHotelId = create<HotelIdState>()(
    persist(
      (set) => ({
        hotelId: '',
        setHotelId: (hotelId: string) => set({ hotelId }),
      }),
      {
        name: 'hotelId-storage', // This is the key in localStorage
        storage: {
          getItem: (key) => {
            const item = localStorage.getItem(key); // Use the key here
            return item ? JSON.parse(item) : null;
          },
          setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)), // Use the key here
          removeItem: (key) => localStorage.removeItem(key), // Use the key here
        },
      }
    )
  );
  

export default useHotelId;