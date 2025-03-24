import { ArrowUpRight } from "lucide-react"

const Feature = () => {
  // Feature data array to easily manage and map through features
  const featureData = [
    {
      title: "Weakness Detection",
      description:
        "AI analyzes performance to identify weak areas. This helps students focus on topics that need improvement.",
    },
    {
      title: "Weakness Detection",
      description:
        "AI analyzes performance to identify weak areas. This helps students focus on topics that need improvement.",
    },
    {
      title: "Weakness Detection",
      description:
        "AI analyzes performance to identify weak areas. This helps students focus on topics that need improvement.",
    },
    {
      title: "Weakness Detection",
      description:
        "AI analyzes performance to identify weak areas. This helps students focus on topics that need improvement.",
    },
    {
      title: "Weakness Detection",
      description:
        "AI analyzes performance to identify weak areas. This helps students focus on topics that need improvement.",
    },
    {
      title: "Weakness Detection",
      description:
        "AI analyzes performance to identify weak areas. This helps students focus on topics that need improvement.",
    },
  ]

  return (
    <section className="w-full bg-black py-16 px-4 md:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">Our Features</h2>
          <p className="text-white text-lg md:text-xl max-w-2xl font-['Poppins']">
            Our platform combines cutting-edge AI technology with proven learning methodologies to help you excel in JEE
            & NEET exams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featureData.map((feature, index) => (
            <div key={index} className="relative">
              {/* Feature Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 h-full">
                <h3 className="text-2xl font-bold mb-3 font-['Poppins']">{feature.title}</h3>
                <p className="text-base md:text-lg font-['Poppins']">{feature.description}</p>
              </div>

              {/* Arrow Circle */}
              <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md  border-black border-8">
                <ArrowUpRight className="w-10 h-10 transform rotate-5 " />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feature

