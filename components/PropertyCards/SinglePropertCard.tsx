'use client'

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Heart, Star, ChevronLeft, ChevronRight, MapPin, Bed, Bath, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Hotel } from "@/types/types"

// Dummy data
const dummyHotel: Hotel = {
  id: "1",
  name: "Luxurious Seaside Resort",
  address: "123 Ocean Drive",
  city: "Miami",
  country: "USA",
  rooms: 50,
  Bedrooms: 2,
  Washrooms: 2,
  description: "Experience luxury by the sea in our stunning resort. Enjoy breathtaking ocean views, world-class amenities, and unparalleled comfort.",
  category: "Resort",
  averageRating: 4.8,
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  rules: ["No smoking", "No pets", "Check-in after 3 PM"],
  facilities: ["Wi-Fi", "Pool", "Gym", "Restaurant"],
  adultRent: 299,
  childrenRent: 50,
  infantsRent: 0,
  petRent: 30,
  reviews: [],
  userEmail: "host@example.com",
}

const SinglePropertyCard = ({ property = dummyHotel }: { property?: Hotel }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const cardRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    // Removed useEffect hook
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
      animate={controls}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div className="relative w-full h-full">
        <div className="relative h-72">
          <Image
            src={property.images[currentImage]}
            alt={property.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-70" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:text-emerald-500 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault()
              // Add to favorites logic here
            }}
          >
            <Heart className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-emerald-500 transition-colors duration-300"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-emerald-500 transition-colors duration-300"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{property.name}</h3>
              <p className="text-emerald-400 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {property.city}, {property.country}
              </p>
            </div>
            {property.averageRating && (
              <div className="flex items-center bg-emerald-500 rounded-full px-3 py-1">
                <Star className="h-4 w-4 text-yellow-600 mr-1" />
                <span className="text-white font-bold">{property.averageRating.toFixed(1)} 
             
                </span>
              </div>
            )}
          </div>
          <p className="text-gray-400 mb-4 line-clamp-2">{property.description}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            {property.rooms && (
              <span className="flex items-center text-emerald-300">
                <Home className="h-4 w-4 mr-1" />
                {property.rooms} Rooms
              </span>
            )}
            {property.Bedrooms && (
              <span className="flex items-center text-emerald-300">
                <Bed className="h-4 w-4 mr-1" />
                {property.Bedrooms} Bedrooms
              </span>
            )}
            {property.Washrooms && (
              <span className="flex items-center text-emerald-300">
                <Bath className="h-4 w-4 mr-1" />
                {property.Washrooms} Bathrooms
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-700 text-emerald-300 rounded-full px-3 py-1 text-sm">
              {property.category}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-white">${property.adultRent}</span>
              <span className="text-gray-400 text-sm"> / night</span>
            </div>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all duration-300">
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SinglePropertyCard