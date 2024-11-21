"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Facebook, Mail } from 'lucide-react'
const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle login/signup logic here
      console.log(`${isSignUp ? "Signing up" : "Logging in"} with email:`, email)
    }
  
    const socialLoginVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut",
        },
      }),
    }
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text"
              >
                {isSignUp ? "Create Account" : "Welcome Back"}
              </motion.h2>
              <div className="space-y-4 mb-8">
                {["google", "facebook", "github"].map((provider, index) => (
                  <motion.div
                    key={provider}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={socialLoginVariants}
                  >
                    <Button
                      variant="outline"
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    >
                      {provider === "google" && (
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      {provider === "facebook" && <Facebook className="w-5 h-5 mr-2" />}
                      {provider === "github" && <Github className="w-5 h-5 mr-2" />}
                      {isSignUp ? 'Sign up':'Log in'} with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </Button>
                  </motion.div>
                ))}
              </div>
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {isSignUp ? "Sign Up" : "Log In"}
                  </Button>
                </motion.div>
              </form>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="px-8 py-4 bg-gray-700 text-center"
            >
              <p className="text-gray-300">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 text-emerald-400 hover:text-emerald-300 font-semibold focus:outline-none"
                >
                  {isSignUp ? "Log In" : "Sign Up"}
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )  
}

export default LoginForm