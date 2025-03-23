'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  subjectData: any;  // Replace `any` with the appropriate type for better type safety
}

export default function TestModel({ subjectData }: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const subjectId = "mysubjectid"; 
  console.log(subjectData)
 


  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);


  const openInNewWindow = (e: React.MouseEvent) => {
    e.preventDefault();
  
    const url = `/dashboard/ai-mock-test/${subjectId}`;
  
    // Get full screen dimensions
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
  
    const windowFeatures = `width=${width},height=${height},top=0,left=0,toolbar=no,location=no,menubar=no,scrollbars=no,resizable=no,fullscreen=yes`;
  
    // Open the URL in a new fullscreen window
    const newWindow = window.open(url, '_blank', windowFeatures);
  
    if (newWindow) {
      newWindow.moveTo(0, 0);
      newWindow.resizeTo(width, height);
    }
  
    setIsOpen(false);
  };
  
  

  
  return (
    <div className="flex flex-col">
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Start Test
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`
          sm:max-w-md 
          p-0 
          rounded-lg 
          shadow-lg 
          data-[state=open]:animate-contentShow
          overflow-hidden
          ${isMobile ? 'w-full mx-4' : 'w-full mx-auto'}
        `}>
          <DialogHeader className="p-6">
            <DialogTitle className="text-xl font-bold">{subjectData.title}</DialogTitle>
            <DialogDescription className="text-gray-500 mt-2">
              Important Notic
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 py-3 border-t border-gray-200">
            {subjectData.subject.map((item:string)=>(  <p className="text-sm text-gray-600" key={item}>
              {item} 30 Question Any 25 Question for 100 Marks
              </p>))}
            <p className="text-sm text-gray-600">
              
            </p>
          </div>
          
          <DialogFooter className="flex justify-end space-x-2 border-t p-4 bg-gray-50">
            <a 
              href={`/dashboard/ai-mock-test/${subjectId}`}
              onClick={openInNewWindow}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Now
            </a>
            <Button 
              variant="outline" 
              className="border-gray-300 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}