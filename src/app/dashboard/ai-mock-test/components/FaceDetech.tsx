'use client'
import React from 'react'
import { useState, useEffect, useRef } from "react"
import { Users, } from "lucide-react"
export default function FaceDetech() {

    const [multipleFacesDetected, setMultipleFacesDetected] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const dataArrayRef = useRef<Uint8Array | null>(null)
    const faceDetectionIntervalRef = useRef<number | null>(null)



    const startFaceDetection = () => {
        // Clear any existing interval
        if (faceDetectionIntervalRef.current) {
            window.clearInterval(faceDetectionIntervalRef.current)
        }

        // Set up face detection simulation
        // In a real implementation, you would use a face detection library
        faceDetectionIntervalRef.current = window.setInterval(() => {






            // Simulate occasional detection of multiple faces (random for demo)
            const multipleFaces = Math.random() > 0.9

            setMultipleFacesDetected(multipleFaces)
        }, 3000)

    }



    // Initialize camera with face detection
    const initCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true, // Also request audio for noise detection
            })

            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }

            // Initialize audio context for noise detection
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            audioContextRef.current = audioContext

            const audioSource = audioContext.createMediaStreamSource(stream)
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256
            audioSource.connect(analyser)
            analyserRef.current = analyser

            const bufferLength = analyser.frequencyBinCount
            const dataArray = new Uint8Array(bufferLength)
            dataArrayRef.current = dataArray

            // Start face detection simulation
            startFaceDetection()

        } catch (err) {
            console.error("Error accessing media devices:", err)
        }
    }

    useEffect(() => {
        // Initialize camera
        initCamera()
    }, [])

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Proctoring Camera</h3>
                <div className="flex items-center text-xs text-red-500">
                    <span className="relative flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Live
                </div>
            </div>
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-md aspect-video overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <canvas
                    ref={canvasRef}
                    style={{ position: "absolute", top: 0, left: 0 }}
                />
                {multipleFacesDetected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                        <div className="bg-white p-2 rounded-md flex items-center text-red-600">
                            <Users className="h-4 w-4 mr-1" />
                            Multiple faces detected!
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
