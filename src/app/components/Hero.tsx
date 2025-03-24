const Hero = () => {
    return (
      <div className="w-full  md:px-10 pt-5 bg-white flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="w-full flex flex-col justify-start items-center">
          <div className="w-full flex flex-col justify-start items-start">
            <div className="w-full flex flex-col justify-start items-center gap-5">
              {/* Header with Logo and Auth Buttons */}
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-[51px] h-[51px] bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
                    <span>PG</span>
                  </div>
                  <div className="text-black text-2xl md:text-4xl font-medium font-['Poppins'] leading-7">PrepGen</div>
                </div>
                <div className="flex justify-center items-center gap-3.5">
                  <button className="px-6 md:px-10 py-1 bg-black rounded-full flex justify-center items-center">
                    <div className="text-white text-[17px] md:text-[17px] font-medium font-['Poppins']">Login</div>
                  </button>
                  <button className="px-10 md:px-10 py-1  bg-[#43b7b7] rounded-full flex justify-center items-center">
                    <div className="text-white font-medium text-[17px] md:text-[17px]  font-['Poppins']">Signup</div>
                  </button>
                </div>
              </div>
  
              {/* Main Heading */}
              <div className="text-center w-full px-2 mb-8">
                <h1 className="text-4xl md:text-6xl font-semibold font-['Poppins']">
                  <span className="text-[#43b7b7]">AI-Powered</span>
                  <span className="text-black">
                    {" "}
                    Learning, <br />
                    Personalized for Every Student.
                  </span>
                </h1>
              </div>
            </div>
  
            {/* Content Section */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative z-10">
              {/* Left Column - Quote and Stats */}
              <div className="w-full md:w-[361px] flex flex-col justify-start items-start gap-6">
                <div className="flex flex-col justify-center items-start">
                  <div className="text-black text-6xl md:text-8xl font-normal font-['Inter'] leading-none"></div>
                  <div className="text-black text-sm md:text-base font-normal font-['Poppins']">
                    Our AI-powered system personalizes JEE and competitive exam prep by adapting quizzes to student
                    strengths and weaknesses. With AI-driven insights, targeted study material, and flexible assessments,
                    we bridge the gap between testing and improvement—making quality education accessible to all.
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                  <div className="text-[#43b7b7] text-4xl md:text-5xl font-semibold font-['Poppins']">40M+</div>
                  <div className="text-black text-sm md:text-base font-normal font-['Poppins']">Students enrolled</div>
                </div>
              </div>
  
              {/* Center - Image */}
              
                    <img
                      src="centerimg.png"
                      className="w-[550px] h-auto object-cover"
                    />
                 
  
              {/* Right Column - CTA */}
              <div className="w-full md:w-[386px] flex flex-col justify-start items-center md:items-end gap-5 mt-[300px] md:mt-0 relative z-10">
                <div className="text-center md:text-right text-2xl md:text-4xl font-medium font-['Poppins']">
                  Star your learning journey now
                </div>
                <button className="px-8 md:px-12 py-2 bg-black rounded-full flex justify-center items-center">
                  <div className="text-white text-base font-semibold font-['Poppins']">Get Started</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Hero
  
  