'use client'
import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Heart, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SinglePropertCardProps{
    date:string,
    location:string;
    host:string,
    price:string,
    rating:GLfloat,
    images:string[];
    amenities:string[]
}

interface Property{
    property:SinglePropertCardProps,
}

const SinglePropertCard = ({
    property
}:Property) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const cardRef = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  useEffect(() => {
    const updateMousePosition = (ev:MouseEvent) => {
      if (!cardRef.current || !isHovered) return
      const rect = cardRef.current.getBoundingClientRect()
      x.set(ev.clientX - rect.left - rect.width / 2)
      y.set(ev.clientY - rect.top - rect.height / 2)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [isHovered, x, y])

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
    style={{
      perspective: 1000,
    }}
    animate={controls}
    onHoverStart={() => {
      setIsHovered(true)
      controls.start({ scale: 1.05 })
    }}
    onHoverEnd={() => {
      setIsHovered(false)
      controls.start({ scale: 1 })
    }}
  >
    <motion.div
      className="relative w-full h-full"
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
    >
      <div className="relative h-72">
        <Image
          src={property.images[currentImage]}
          alt={property.location}
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
            <h3 className="text-2xl font-bold text-white mb-2">{property.location}</h3>
            <p className="text-emerald-400 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Hosted by {property.host}
            </p>
          </div>
          <div className="flex items-center bg-emerald-500 rounded-full px-3 py-1">
            <Star className="h-4 w-4 text-white mr-1" />
            <span className="text-white font-bold">{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-400 mb-4">{property.date}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.map((amenity, index) => (
            <span
              key={index}
              className="bg-gray-700 text-emerald-300 rounded-full px-3 py-1 text-sm"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">{property.price}</span>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all duration-300">
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  </motion.div>

  )
}

export default SinglePropertCard