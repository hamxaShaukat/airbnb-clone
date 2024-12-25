"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check, X } from 'lucide-react'
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Separator } from "../ui/separator"
import axios from "axios"
import Swal from "sweetalert2"
// import { signOut } from "@/auth"
import { useRouter } from "next/navigation"

export default function HostPage() {
  const router = useRouter();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const comparisonData = [
    {
      title: "Instant Payments",
      description: "Get paid within 24 hours of your guest's check-in, guaranteed. No more waiting for days or weeks.",
      hasFeature: true,
      competitorHasFeature: false
    },
    {
      title: "Smart Pricing",
      description: "Our AI-powered pricing system ensures you get the best rates based on season, demand, and local events.",
      hasFeature: true,
      competitorHasFeature: true
    },
    {
      title: "Property Protection",
      description: "Up to $3M in damage protection, including specialized coverage for luxury items and artwork.",
      hasFeature: true,
      competitorHasFeature: false
    },
    {
      title: "Guest identity verification ",
      description: "Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Airbnb.",
      hasFeature: true,
      competitorHasFeature: false
    },
    {
      title: "Reservation screening",
      description: "Our proprietary technology analyzes hundreds of factors in each reservation and blocks certain bookings that show a high risk for disruptive parties and property damage.",
      hasFeature: true,
      competitorHasFeature: true
    },
    {
      title: "$3M damage protection",
      description: "Hamu TRVs reimburses you for damage caused by guests to your home and belongings and includes these specialized protections:",
      hasFeature: true,
      competitorHasFeature: false
    },
    {
      title: "$1M liability insurance",
      description: "You’re protected in the rare event that a guest gets hurt or their belongings are damaged or stolen.",
      hasFeature: true,
      competitorHasFeature: true
    },
    {
      title: "24-hour safety line",
      description: "If you ever feel unsafe, our app provides one-tap access to specially-trained safety agents, day or night.",
      hasFeature: true,
      competitorHasFeature: false
    },
  ]

  const faqData = [
    {
      question: "How much can I earn as a host?",
      answer: "Earnings vary based on your location, property size, and amenities. Our hosts typically earn between $40 to $1000 per night. Use our earnings calculator to get a personalized estimate."
    },
    {
      question: "What support do you provide to hosts?",
      answer: "We provide 24/7 customer support, professional photography services, pricing optimization tools, and a dedicated host success manager for premium properties."
    },
    {
      question: "How do you screen guests?",
      answer: "We use a comprehensive verification system that checks government ID, social profiles, and booking patterns. We also allow hosts to set their own house rules and requirements."
    },
    {
      question: "What are the hosting fees?",
      answer: "Our hosting fee is one of the lowest in the industry, starting at just 3% for standard hosts. This includes payment processing, customer support, and marketing services."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Click the 'Become a Host' button, complete your property profile, and our team will guide you through the rest of the process."
    }
  ]
  const handleClick = async () => {
    const response = await axios.post('/api/promote');
    if(response.status === 200){
      Swal.fire({
        icon:'success',
        title: 'Promotion Successful',
        text: 'You have hosting rights now! log out and then login again to start the new session'
      });
      // await signOut();
    }
    else if(response.status ===400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Kindly log in first in order to become host.'
      });
      router.push('/login')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while trying to promote your account.'
      });
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 py-20 px-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-gray-900 to-gray-900 opacity-90" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="relative z-10"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Host your home on{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
                  Hamu TRVs
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Start earning from $40 to $1000 per night with our industry-leading low hosting fees. Turn your property into a profitable venture today.
              </p>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl transform transition-all duration-300 hover:scale-105"
              >
                Become a Host
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 hidden lg:block"
            >
              <Image
                src="/assets/imag1.jpg"
                alt="Luxury home interior"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-emerald-500">Hamu TRVs?</span> 
            </h2>
            <p className="text-xl text-gray-600">
              Compare our features with other platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="col-span-1">
              <h3 className="text-xl font-semibold text-gray-300 mb-4">Features</h3>
            </div>
            <div className="col-span-1 text-center">
              <h3 className="text-xl font-semibold text-emerald-600 mb-4">Hamu TRVs</h3>
            </div>
            <div className="col-span-1 text-center">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Competitors</h3>
            </div>
          </div>

          {comparisonData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6 border-b border-gray-200"
            >
              <div className="col-span-1">
                <h4 className="text-2xl font-bold text-gray-300 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                {item.hasFeature ? (
                  <Check className="w-8 h-8 text-emerald-500" />
                ) : (
                  <X className="w-8 h-8 text-red-500" />
                )}
              </div>
              <div className="col-span-1 flex justify-center items-center">
                {item.competitorHasFeature ? (
                  <Check className="w-8 h-8 text-gray-400" />
                ) : (
                  <X className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-300 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-500">
              Everything you need to know about hosting
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-gray-300 hover:text-emerald-600">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
     <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Dialog>
              <DialogTrigger>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 text-lg rounded-xl transform transition-all duration-300 hover:scale-105">
                  Start Hosting Today
                </div>
              </DialogTrigger>
              <DialogContent className="border-2 border-emerald-600">
                <DialogHeader>
                  <DialogTitle>Do you want to become a Host?</DialogTitle>
                  <DialogDescription>
                    <Separator className="border border-emerald-500 my-6" />
                    <p>
                      We are deeply committed to providing top-quality services
                      to our customers. Therefore, we kindly request your
                      cooperation in maintaining and promoting the best living
                      standards for our guests. We trust that you will uphold
                      this commitment and not breach our trust.
                    </p>
                    <p>
                      <span className="text-lg font-semibold text-emerald-400">
                        Please note:{" "}
                      </span>
                      If your hotel has a <b>rating</b> lower than 3, it will be
                      removed from our server. Kindly keep this in mind.
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <Separator className="border border-emerald-500 my-6" />
                <DialogFooter>
                  <Button className="bg-emerald-500" onClick={handleClick}>I agree</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  )
}