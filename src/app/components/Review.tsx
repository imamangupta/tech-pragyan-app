'use client'
import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icon from react-icons
const Review = () => {
  const reviews = [
    {
      id: 1,
      title: "Adaptivity",
      description: "The adaptive mock tests helped me identify my weak areas and focus my preparation accordingly. The detailed analytics after each test were incredibly helpful.",
      name: "Priya Patel",
      rank: "NEET AIR 78",
      image: "https://placehold.co/40x40"
    },
    {
      id: 2,
      title: "Comprehensive Material",
      description: "The study material provided was very comprehensive and covered all the topics in detail. It made my preparation much easier.",
      name: "Rahul Sharma",
      rank: "JEE AIR 45",
      image: "https://placehold.co/40x40"
    },
    {
      id: 3,
      title: "Expert Guidance",
      description: "The guidance from the experts was invaluable. They helped me understand complex concepts with ease.",
      name: "Anjali Mehta",
      rank: "AIIMS AIR 12",
      image: "https://placehold.co/40x40"
    },
    {
      id: 4,
      title: "Regular Assessments",
      description: "The regular assessments kept me on track and helped me improve my performance consistently.",
      name: "Vikram Singh",
      rank: "NEET AIR 56",
      image: "https://placehold.co/40x40"
    },
    {
      id: 5,
      title: "Interactive Sessions",
      description: "The interactive sessions with mentors were very engaging and helped clarify my doubts effectively.",
      name: "Sneha Reddy",
      rank: "JEE AIR 30",
      image: "https://placehold.co/40x40"
    },
    {
      id: 6,
      title: "Personalized Study Plan",
      description: "The personalized study plan tailored to my strengths and weaknesses was a game-changer for my preparation.",
      name: "Arjun Kapoor",
      rank: "NEET AIR 65",
      image: "https://placehold.co/40x40"
    },
    {
      id: 7,
      title: "Doubt Clearing",
      description: "The doubt-clearing sessions were very effective and helped me understand difficult concepts better.",
      name: "Meera Desai",
      rank: "AIIMS AIR 18",
      image: "https://placehold.co/40x40"
    },
    {
      id: 8,
      title: "Mock Tests",
      description: "The mock tests were very close to the actual exam pattern and helped me get a real-time exam experience.",
      name: "Rohan Verma",
      rank: "JEE AIR 50",
      image: "https://placehold.co/40x40"
    },
    {
      id: 9,
      title: "Study Material",
      description: "The study material was very well-organized and covered all the important topics in detail.",
      name: "Kavita Joshi",
      rank: "NEET AIR 70",
      image: "https://placehold.co/40x40"
    },
    {
      id: 10,
      title: "Mentor Support",
      description: "The mentor support was excellent, and they were always available to guide me through my preparation.",
      name: "Rajesh Kumar",
      rank: "AIIMS AIR 25",
      image: "https://placehold.co/40x40"
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3) % reviews.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 3 + reviews.length) % reviews.length);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full px-4 md:px-12 py-11 bg-black flex flex-col justify-start items-center gap-2.5 overflow-hidden">
      <div className="w-full flex flex-col justify-start items-center gap-[35px]">
        <div className="w-full max-w-[711px] flex flex-col justify-start items-center text-center">
          <div className="text-white text-3xl md:text-[40px] font-semibold font-poppins">
            Success Stories from Our Students
          </div>
          <div className="text-white text-lg md:text-xl font-normal font-poppins">
            Hear from students who achieved their dream ranks with our platform.
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-6 relative">
          <button onClick={handlePrevious} className="text-white text-2xl font-bold absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            &lt;
          </button>
          <div className="w-full max-w-[1200px] overflow-x-hidden">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
              {reviews.map((review, index) => (
                <div key={review.id} className="w-full flex-shrink-0 p-6 bg-white rounded-lg flex flex-col justify-start items-start gap-6 mx-2" style={{ width: 'calc(100% / 3)' }}>
                  <div className="flex justify-start items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5" />
                    ))}
                  </div>
                  <div className="w-full flex flex-col justify-start items-start gap-1">
                    <div className="text-black text-2xl font-semibold font-poppins">
                      {review.title}
                    </div>
                    <div className="text-black text-base font-normal font-poppins">
                      {review.description}
                    </div>
                  </div>
                  <div className="w-full flex justify-start items-center gap-3">
                    <img className="w-10 h-10 rounded-full" src={review.image} alt="Profile" />
                    <div className="flex flex-col justify-start items-start gap-0.5">
                      <div className="text-black text-base font-semibold font-poppins">
                        {review.name}
                      </div>
                      <div className="text-[#323232] text-base font-normal font-poppins">
                        {review.rank}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleNext} className="text-white text-2xl font-bold absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;