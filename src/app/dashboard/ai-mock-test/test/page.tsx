"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import useUnloadConfirmation from "@/hooks/use-leavetabcomfirm";
import { Users, } from "lucide-react"


const MultiFaceDetection: React.FC = () => {

    // let dataquestion = useGenerateQuestion(['Physics','Chemistry','Mathematics'])
    // console.log(dataquestion);

    

    const [multipleFacesDetected, setMultipleFacesDetected] = useState(false)
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    // const [faceCount, setFaceCount] = useState(0);

    //   useUnloadConfirmation('alsdkjflasdkfj')
    useUnloadConfirmation("You have unsaved changes. Are you sure you want to leave?");

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = "/models";  // Ensure models are in public/models
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

                setIsModelLoaded(true);
                console.log("✅ Models Loaded");
                startVideo();
            } catch (error) {
                console.error("❌ Error loading models:", error);
            }
        };

        loadModels();
    }, []);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => console.error("❌ Error accessing webcam:", err));
    };

    const handleVideoPlay = () => {
        if (!canvasRef.current || !videoRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;

        const displaySize = {
            width: video.videoWidth,
            height: video.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);

        const detectFaces = async () => {
            try {
                const detections = await faceapi
                    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions();

                const count = detections.length;
                // setFaceCount(count);

                console.log(`👥 Number of people detected: ${count}`);
                if (count > 1) {
                    setMultipleFacesDetected(true)
                    console.log("many epeop")
                    
                }else{
                    setMultipleFacesDetected(false)

                }

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                );

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                }
            } catch (error) {
                console.error("❌ Face detection error:", error);
            }

            requestAnimationFrame(detectFaces);
        };

        detectFaces();
    };

    return (
        <div className="mb-4">
            <div>
                useGenerateQuestion
            </div>
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
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    onPlay={handleVideoPlay}
                    className="w-full h-full object-cover"
                    style={{ border: "1px solid black" }}
                />
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
            {isModelLoaded ? <p>✅ Model Loaded</p> : <p>⌛ Loading models...</p>}
        </div>
    );
};

export default MultiFaceDetection;
