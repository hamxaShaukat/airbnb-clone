"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { LockIcon, HomeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Particle = ({ index }: { index: number }) => {
  const randomSize = Math.random() * 4 + 1
  const randomDuration = Math.random() * 10 + 10
  const randomDelay = Math.random() * 5

  return (
    <motion.div
      className="absolute bg-emerald-500 rounded-full"
      style={{
        width: randomSize,
        height: randomSize,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -1000],
        opacity: [1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
      }}
    />
  )
}

export default function UnauthorizedPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const handleClick=() => router.push('/')
  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {mounted && Array.from({ length: 50 }).map((_, index) => (
        <Particle key={index} index={index} />
      ))}
      <div className="z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <LockIcon className="w-32 h-32 text-emerald-500 mx-auto" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text"
        >
          Access Denied
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-8"
        >
          Oops! It seems you don&spos;t have permission to view this page.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={handleClick}
          >
            <HomeIcon className="mr-2 h-5 w-5" />
            Go to Homepage
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20"
          />
        )}
      </AnimatePresence>
    </div>
  )
}