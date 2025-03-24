const Steps = () => {
    // Step data array to easily manage and map through steps
    const stepsData = [
      {
        number: "01",
        title: "Sign Up & Create Profile",
        description: "Create your account and set up your academic profile with your goals and preferences.",
      },
      {
        number: "02",
        title: "Sign Up & Create Profile",
        description: "Create your account and set up your academic profile with your goals and preferences.",
      },
      {
        number: "03",
        title: "Sign Up & Create Profile",
        description: "Create your account and set up your academic profile with your goals and preferences.",
      },
      {
        number: "04",
        title: "Sign Up & Create Profile",
        description: "Create your account and set up your academic profile with your goals and preferences.",
      },
    ]
  
    return (
      <section className="w-full py-16 px-4 md:px-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">How Our Platform Works</h2>
            <p className="text-lg md:text-xl font-['Poppins']">
              A simple step-by-step process to transform your exam preparation journey.
            </p>
          </div>
  
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-black"></div>
  
            {/* Steps */}
            <div className="relative">
              {stepsData.map((step, index) => {
                const isEven = index % 2 === 0
  
                return (
                  <div
                    key={index}
                    className={`flex items-center mb-2 md:mb-4 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Step Content - Left or Right based on index */}
                    <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="bg-black text-white rounded-3xl p-6 md:p-8 inline-block w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-2 font-['Poppins']">{step.title}</h3>
                        <p className="text-base md:text-lg font-['Poppins']">{step.description}</p>
                      </div>
                    </div>
  
                    {/* Timeline Circle and Number */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      {/* Circle */}
                      <div className="w-6 h-6 bg-white border-2 border-black rounded-full z-10"></div>
  
                      {/* Number Circle */}
                      
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Steps
  
  