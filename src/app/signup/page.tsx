"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { BaseUrlApi } from "@/utils/constant"
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    stream: "pcm", // Default to PCM
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // Handle radio button change
  const handleStreamChange = (value: string) => {
    setFormData({ ...formData, stream: value })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch(`${BaseUrlApi}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email, password: formData.password, role: formData.stream, username: formData.username, firstname: formData.firstName,
         lastname: formData.lastName })
    });
    const json = await response.json();

    if (json) {
      console.log(json);
      localStorage.setItem('email', formData.email)
      // toast.success("Otp send successfully");
      router.push("/otp")
    } else {
      // toast.error("Error to Create");
    }

    // Log the form data
    console.log("Form submitted with data:", formData)


  }

  return (

    <div className="flex min-h-screen flex-col md:flex-row bg-white">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-md mx-auto w-full"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold">PrepGen</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto w-full"
        >
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground mb-8">
            Join our community of students and start your preparation journey
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="john.doe"
                value={formData.username}
                onChange={handleChange}
                required
                className="rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-3">
              <Label>Select Your Stream</Label>
              <RadioGroup
                defaultValue="pcm"
                value={formData.stream}
                onValueChange={handleStreamChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-3 transition-all hover:bg-muted/50">
                  <RadioGroupItem value="pcm" id="pcm" />
                  <Label htmlFor="pcm" className="flex-1 cursor-pointer font-medium">
                    PCM (Physics, Chemistry, Mathematics)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 transition-all hover:bg-muted/50">
                  <RadioGroupItem value="pcmb" id="pcmb" />
                  <Label htmlFor="pcmb" className="flex-1 cursor-pointer font-medium">
                    PCMB (Physics, Chemistry, Mathematics, Biology)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="#" className="text-primary hover:underline">
                  terms & conditions
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  privacy policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl py-6 text-base font-medium transition-all hover:shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Log In
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:block md:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40 z-10 mix-blend-multiply" />
        <img
          src="https://gray-kfvs12-prod.gtv-cdn.com/resizer/v2/AYU7VRZ6K5AERPYHZ6FETO3HXE.jpg?auth=c3c88be112c78cdf7f2a0c5d9201ab2f7b199c8a73c4006ec35334f47c3c4e73&width=1200&height=800&smart=true"
          alt="Students studying"
          width={800}
          height={1200}
          className="h-full w-full object-cover"

        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Prepare for Success</h2>
            <p className="text-lg opacity-90">
              Join thousands of students who are achieving their academic goals with our personalized preparation
              resources.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

