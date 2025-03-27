'use client'
import { useState, useEffect } from 'react';
import { FaRobot, FaBookOpen, FaRoad, FaNewspaper, FaClipboardCheck, FaChalkboardTeacher } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import Link from "next/link";
import { useInView } from 'react-intersection-observer';
 // Make sure to add your image file
 interface TypewriterOptions {
  typingSpeed: number;
  deletingSpeed: number;
  pauseDuration: number;
}

const useTypewriter = (texts: string[], options: TypewriterOptions = { typingSpeed: 100, deletingSpeed: 50, pauseDuration: 1500 }) => {
  // Y
  const { typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 } = options;
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    const currentText = texts[currentIndex % texts.length];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex(currentIndex + 1);
          setLoopCount(loopCount + 1);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        if (displayedText.length === currentText.length) {
          setIsDeleting(true);
          setTimeout(() => {}, pauseDuration);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, currentIndex, isDeleting, loopCount, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayedText;
};

const Landing = () => {


  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
     setIslogin(true)
    }
   }, [])

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  // Typewriter texts
  const typewriterTexts = [
    'Revolutionize Your <span class="text-gray-700">Exam Prep</span>',
    'Transform Your <span class="text-gray-700">Learning</span>',
    'Master <span class="text-gray-700">Competitive Exams</span>'
  ];
  const displayedText = useTypewriter(typewriterTexts, {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000
  });

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "JEE Aspirant",
      content: "PrepGen's AI roadmap helped me structure my study plan perfectly. I improved my rank by 2000 positions!"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "NEET Student",
      content: "The AI mock tests are incredibly realistic. They prepared me for the actual exam environment."
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "UPSC Candidate",
      content: "The personalized feedback from the AI chatbot is game-changing. It's like having a tutor 24/7."
    }
  ];

  // Features data
  const features = [
    {
      icon: <FaRobot className="w-8 h-8 text-gray-900" />,
      title: "AI-powered chatbot",
      description: "Get instant answers to your doubts with our 24/7 AI tutor"
    },
    {
      icon: <FaClipboardCheck className="w-8 h-8 text-gray-900" />,
      title: "AI mock tests",
      description: "Simulate real exam conditions with adaptive difficulty"
    },
    {
      icon: <FaBookOpen className="w-8 h-8 text-gray-900" />,
      title: "AI EasyStudy",
      description: "Personalized study materials based on your learning style"
    },
    {
      icon: <FaRoad className="w-8 h-8 text-gray-900" />,
      title: "AI roadmap",
      description: "Customized study plan that adapts to your progress"
    },
    {
      icon: <FaNewspaper className="w-8 h-8 text-gray-900" />,
      title: "News forum",
      description: "Stay updated with latest exam patterns and notifications"
    },
    {
      icon: <FaChalkboardTeacher className="w-8 h-8 text-gray-900" />,
      title: "Competitive test",
      description: "Compete with peers in real-time assessment battles"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <span className="text-2xl font-bold text-gray-900">PrepGen</span>
              </motion.div>
              <div className="hidden md:flex ml-10 space-x-8">
                {['Home', 'Features', 'About', 'Testimonials'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 text-gray-900"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {!isLogin ? <>

            <div className="flex items-center space-x-4">
              <Link href='/login'>
              <button className="px-4 py-2 cursor-pointer rounded-md text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white">
                Login
              </button>
              </Link>
              <Link href='/signup'>
              <button className="px-4 py-2 cursor-pointer rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-900">
                Sign Up
              </button>
              </Link>
            </div>
            </>:<>
            <div className="flex items-center space-x-4">
              <Link href='/dashboard/overview'>
              <button className="px-4 py-2 cursor-pointer rounded-md text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white">
                Dashboard
              </button>
              </Link>
             
            </div>
            </>}
          </div>
        </div>
      </nav>

      {/* Hero Section - Modified with square image and no floating divs */}
      <section id="home" className=" min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Square Image */}
            <div className="w-full md:w-1/2 aspect-square overflow-hidden rounded-2xl ">
              <img 
                src="/exam-prep.jpeg"
                alt="Student preparing for exams with AI assistance"
                className="w-[600px] h-auto object-cover"
              />
            </div>

            {/* Content with Typewriter */}
            <div className="w-full md:w-1/2">
              <div className="h-40 flex items-center">
                <h1 
                  className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
                  dangerouslySetInnerHTML={{ __html: displayedText }}
                />
              </div>
              <p className="text-xl mt-4 text-gray-600">
                AI-powered personalized preparation for competitive exams. Study smarter, not harder.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-4 rounded-lg text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white flex items-center">
                  Get Started <FiArrowRight className="ml-2" />
                </button>
                <button className="px-8 py-4 rounded-lg text-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-900">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.div 
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About PrepGen
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              PrepGen is an AI-powered personalized competitive exam preparation platform that adapts to your learning style, 
              identifies your weaknesses, and creates a customized study plan to maximize your efficiency and performance.
            </p>
          </motion.div>
        </div>
      </section>

      

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Powerful Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Everything you need to ace your competitive exams, powered by artificial intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='flex flex-col items-center justify-center'>
      

        <h1 className='text-4xl font-bold pt-10'>Ai-Mentor</h1>
        <p className='px-20 py-10 text-center'>PrepGen’s AI Mentor is both a study guide and a therapist, helping JEE students with personalized study plans, exam strategies, and stress management. It provides real-time insights, motivation, and emotional support to keep students focused and confident.</p>
        <img className='w-[600px] h-auto' src="/Mock.jpeg" alt="" />
        
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Don't just take our word for it. Here's what our users have to say about their experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-white shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "{testimonial.content}"
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PrepGen</h3>
              <p className="text-gray-400">
                AI-powered personalized competitive exam preparation platform.
              </p>
              <div className="flex space-x-4 mt-6">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Features', 'About', 'Testimonials'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {feature.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@prepgen.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 AI Street, Tech City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} PrepGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;