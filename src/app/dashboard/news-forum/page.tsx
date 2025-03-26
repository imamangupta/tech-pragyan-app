// import React from "react";
// import Image from "next/image";
// import Sidebar from "@/components/Sidebar";

// // Dummy data for posts
// const newsPosts = [
//   {
//     id: 1,
//     user: "User Name",
//     userImg: "/user.png",
//     postImg: "/featured.jpg",
//     title: "Cracking NEET",
//     content:
//       "The National Eligibility cum Entrance Test (NEET) is the key to securing a seat in India's top medical and dental colleges. Every year, lakhs of aspirants compete...",
//   },
//   {
//     id: 2,
//     user: "User Name",
//     userImg: "/user.png",
//     postImg: "/post.jpg",
//     title: "Cracking NEET",
//     content:
//       "The National Eligibility cum Entrance Test (NEET) is the key to securing a seat in India's top medical and dental colleges...",
//   },
//   {
//     id: 3,
//     user: "User Name",
//     userImg: "/user.png",
//     postImg: "/post.jpg",
//     title: "Cracking NEET",
//     content:
//       "The National Eligibility cum Entrance Test (NEET) is the key to securing a seat in India's top medical and dental colleges...",
//   },
//   {
//     id: 4,
//     user: "User Name",
//     userImg: "/user.png",
//     postImg: "/post.jpg",
//     title: "Cracking NEET",
//     content:
//       "The National Eligibility cum Entrance Test (NEET) is the key to securing a seat in India's top medical and dental colleges...",
//   },
// ];

// const NewsForum: React.FC = () => {
//   return (
//     <>
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex flex-col w-full p-6">
//           {/* Header */}
//           <div className="mb-4">
//             <h1 className="text-3xl font-bold">News Forum</h1>
//             <p className="text-gray-500">Tuesday, 18 March, 2025</p>
//           </div>

//           {/* Grid of Posts */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {newsPosts.map((post) => (
//               <div
//                 key={post.id}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
//               >
//                 <div className="flex items-center mb-2">
//                   <Image
//                     src={post.userImg}
//                     width={30}
//                     height={30}
//                     alt="User"
//                     className="rounded-full"
//                   />
//                   <span className="ml-2 font-semibold">{post.user}</span>
//                 </div>
//                 <Image
//                   src={post.postImg}
//                   width={300}
//                   height={200}
//                   alt="Post"
//                   className="rounded-lg object-cover"
//                 />
//                 <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
//                 <p className="text-gray-600 text-sm">{post.content}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewsForum;

"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
// import Image from "next/image";
import Sidebar from "@/components/Sidebar";

const NewsForum: React.FC = () => {
  const [newsPosts, setNewsPosts] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/news"); // Make sure this API endpoint is working
        setNewsPosts(response.data);
        console.log(newsPosts);
        
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col w-full p-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold">News Forum</h1>
          <p className="text-gray-500">Tuesday, 18 March, 2025</p>
        </div>

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {newsPosts.map((post: any) => (
            <div
              key={post._id} // Assuming the API returns MongoDB ObjectId as _id
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-2">
                <Image
                  src={post.userImg || "/default-user.svg"} // Fallback for missing image
                  width={30}
                  height={30}
                  alt="User"
                  className="rounded-full"
                />
                <span className="ml-2 font-semibold">{post.user}</span>
              </div>
              <Image
                src={post.postImg || "/default-post.png"} // Fallback for missing image
                width={300}
                height={200}
                alt="Post"
                className="rounded-lg object-cover  w-full"
              />
              <h2 className="text-3xl md-xl font-semibold mt-2">{post.title}</h2>
              <p className="text-gray-600 text-xl md-text-lg">{post.content}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default NewsForum;

