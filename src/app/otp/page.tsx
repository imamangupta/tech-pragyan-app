"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { BaseUrlApi } from "@/utils/constant"
import { useRouter } from 'next/navigation'

export default function OtpVerificationPage() {
    /// <reference path="" />
    
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const [loading, setLoading] = useState(false)
    const [resendDisabled, setResendDisabled] = useState(false)
    const [countdown, setCountdown] = useState(30)
    const router = useRouter()

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value

        // Only allow numbers
        if (!/^\d*$/.test(value)) return

        // Update the OTP array
        const newOtp = [...otp]
        // Take only the last character if multiple are pasted
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        // Auto-focus next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    // Handle key down events (for backspace navigation)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // Focus previous input when backspace is pressed on an empty input
            inputRefs.current[index - 1]?.focus()
        }
    }

    // Handle paste event
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").trim()

        // Check if pasted content is a 6-digit number
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("")
            setOtp(digits)

            // Focus the last input
            inputRefs.current[5]?.focus()
        }
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const otpValue = otp.join("")

        // Validate OTP
        if (otpValue.length !== 6) {
            toast({
                title: "Invalid OTP",
                description: "Please enter all 6 digits of the OTP",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        // Log the OTP
        console.log("OTP submitted:", otpValue)

        const response = await fetch(`${BaseUrlApi}/user/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email'), userotp: otpValue })
        });
        const json = await response.json();

        if (json.message) {

            localStorage.setItem('token', json.data.token)
            router.push("/dashboard")
        } else {
            // toast.error("Error to Create");
        }

        // Here you would typically send the OTP to your server for verification
        console.log('Submitting OTP:', otp)

    }

    // Handle resend OTP
    const handleResendOtp = () => {
        if (resendDisabled) return

        console.log("Resending OTP...")

        toast({
            title: "OTP Resent",
            description: "A new OTP has been sent to your email/phone",
        })

        setResendDisabled(true)
        setCountdown(30)
    }

    // Countdown timer for resend button
    useEffect(() => {
        let timer: NodeJS.Timeout

        if (resendDisabled && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000)
        } else if (countdown === 0) {
            setResendDisabled(false)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [resendDisabled, countdown])

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-white">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
                {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold">PrepGen</span>
          </Link>
        </motion.div> */}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-md mx-auto w-full"
                >
                    <h1 className="text-3xl font-bold mb-2 text-center">Verify Your Account</h1>
                    <p className="text-muted-foreground mb-8">
                        Weve sent a 6-digit verification code to your email address. Please enter it below to verify your account.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <Label htmlFor="otp-input-0" className="block text-center mb-2">
                                Enter Verification Code
                            </Label>

                            <div className="flex justify-between gap-2">
                                {otp.map((digit, index) => (
                                    <div key={index} className="w-full">
                                        <input
                                            ref={function (el: Ref<HTMLInputElement>) {
                                                return (inputRefs.current[index] = el)
                                            }}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            className="w-full h-16 text-center text-2xl font-bold rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 outline-none"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-sm text-center text-muted-foreground mt-2"
                            >
                                Didnt receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={resendDisabled}
                                    className={`text-primary font-medium hover:underline ${resendDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
                                </button>
                            </motion.p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-xl py-6 text-base font-medium transition-all hover:shadow-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Account"
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
                            Back to{" "}
                            <Link href="/signup" className="text-primary font-medium hover:underline">
                                Sign Up
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
                    alt="Security verification"
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
                        <h2 className="text-3xl font-bold mb-4">Almost There!</h2>
                        <p className="text-lg opacity-90">
                            Verify your account to access all the features and resources available for your preparation journey.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

