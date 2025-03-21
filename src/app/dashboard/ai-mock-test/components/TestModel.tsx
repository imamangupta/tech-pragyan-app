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

export default function ResponsiveDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const subjectId = "mysubjectid"; // You can make this dynamic or pass as a prop

  // Handle responsive behavior
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

  // Function to open link in a new window with specified dimensions
  const openInNewWindow = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `/dashboard/ai-mock-test/${subjectId}`;
    const windowFeatures = 'width=1200,height=800,resizable=yes,scrollbars=yes,status=yes';
    window.open(url, '_blank', windowFeatures);
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
            <DialogTitle className="text-xl font-bold">Are you absolutely sure?</DialogTitle>
            <DialogDescription className="text-gray-500 mt-2">
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              You will be starting a timed test. Once started, the timer cannot be paused.
              The test will open in a new window.
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