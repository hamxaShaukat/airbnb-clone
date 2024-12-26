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
            name: 'hotelId-storage',

            storage: {
                getItem: (hotelId) => {
                    const item = localStorage.getItem(hotelId);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (hotelId, value) => localStorage.setItem(hotelId, JSON.stringify(value)),
                removeItem: (hotelId) => localStorage.removeItem(hotelId),
            },
        }
    )
);

export default useHotelId;