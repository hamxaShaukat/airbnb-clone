"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format } from "date-fns"
import { CalendarIcon, Wifi, Tv, CreditCard, Utensils, Bone, Users, Baby } from  "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function ShowcasePage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })

  const houseRules = [
    "Check-in: 3:00 PM - 8:00 PM",
    "Checkout: 11:00 AM",
    "No smoking",
    "No parties or events",
    "Pets are allowed (with additional fee)"
  ]

  const facilities = [
    { icon: Wifi, name: "Free high-speed Wi-Fi" },
    { icon: Tv, name: "Smart TV with Netflix" },
    { icon: CreditCard, name: "Self check-in" },
    { icon: Utensils, name: "Fully equipped kitchen" }
  ]

  const pricing = [
    { icon: Users, type: "Adults", price: 100 },
    { icon: Baby, type: "Children (2-12 years)", price: 50 },
    { icon: Baby, type: "Infants (under 2 years)", price: 0 },
    { icon: Bone, type: "Pets", price: 25 }
  ]

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    const basePrice = days * (guests.adults * pricing[0].price + guests.children * pricing[1].price + guests.pets * pricing[3].price)
    return basePrice
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 to-teal-700 text-transparent bg-clip-text"
      >
        Luxury Beachfront Villa
      </motion.h1>

      {/* Photo Gallery */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-4 grid-rows-2 gap-4 mb-12"
      >
        <div className="col-span-2 row-span-2">
          <Image src="/placeholder.svg?height=600&width=600" alt="Main Villa View" className="w-full h-full object-cover rounded-2xl" height={600} width={600} />
        </div>
        <div>
          <Image src="/placeholder.svg?height=300&width=300" alt="Living Room" className="w-full h-full object-cover rounded-2xl" height={300} width={300} />
        </div>
        <div>
          <Image src="/placeholder.svg?height=300&width=300" alt="Kitchen" className="w-full h-full object-cover rounded-2xl" height={300} width={300} />
        </div>
        <div>
          <Image src="/placeholder.svg?height=300&width=300" alt="Bedroom" className="w-full h-full object-cover rounded-2xl" height={300} width={300} />
        </div>
        <div>
          <Image src="/placeholder.svg?height=300&width=300" alt="Beach View" className="w-full h-full object-cover rounded-2xl" height={300} width={300} />
        </div>
      </motion.div>

      {/* House Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">House Rules</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {houseRules.map((rule, index) => (
            <li key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              {rule}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Facilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facilities.map((facility, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <facility.icon className="w-8 h-8 text-emerald-500 mb-2" />
              <span className="text-center">{facility.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pricing</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pricing.map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <item.icon className="w-8 h-8 text-emerald-500 mb-2" />
              <span className="text-center font-semibold">{item.type}</span>
              <span className="text-emerald-600 font-bold">${item.price}/night</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Book Now Button and Dialog */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl transform transition-all duration-300 hover:scale-105">
              Book Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book Your Stay</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="dates" className="text-sm font-medium">
                  Select Dates
                </label>
                <div className={cn("grid gap-2")}>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    <span className="text-sm text-muted-foreground">
                      {startDate ? format(startDate, "PPP") : "From"}
                      {" - "}
                      {endDate ? format(endDate, "PPP") : "To"}
                    </span>
                  </div>
                  <Calendar
                    mode="range"
                    selected={{ from: startDate, to: endDate }}
                    onSelect={(range) => {
                      setStartDate(range?.from)
                      setEndDate(range?.to)
                    }}
                    numberOfMonths={2}
                    defaultMonth={new Date()}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Guests
                </label>
                {Object.keys(guests).map((type) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="capitalize">{type}</span>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))}
                      >
                        -
                      </Button>
                      <span className="mx-2">{guests[type]}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(prev => ({ ...prev, [type]: prev[type] + 1 }))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Confirm Booking
            </Button>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}