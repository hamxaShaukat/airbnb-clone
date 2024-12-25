// types.ts
export interface Hotel {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    rooms?: number;
    Bedrooms?: number;
    Washrooms?: number;
    description: string;
    category: string;
    averageRating?: number;
    images: string[];
    rules: string[];
    facilities: string[];
    adultRent?: number;
    childrenRent?: number;
    infantsRent?: number;
    petRent?: number;
    reviews: Review[];
    userEmail: string;
  }
  
  export interface Review {
    id: string;
    userEmail: string;
    hotelId: string;
    rating: number;
    comment?: string;
    createdAt: string; 
  }
  