"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const MultiFaceDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [faceCount, setFaceCount] = useState(0);

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
        setFaceCount(count);

        console.log(`👥 Number of people detected: ${count}`);

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
        //   faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
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
    <div>
      <h1>Multi-Face Detection with Face API (TypeScript)</h1>
      <p>Detected Faces: {faceCount}</p>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={handleVideoPlay}
          width={720}
          height={560}
          style={{ border: "1px solid black" }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      {isModelLoaded ? <p>✅ Model Loaded</p> : <p>⌛ Loading models...</p>}
    </div>
  );
};

export default MultiFaceDetection;
