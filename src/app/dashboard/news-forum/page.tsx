"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

interface NewsPost {
  _id: string;
  user: string;
  userImg?: string;
  postImg?: string;
  title: string;
  content: string;
}

const NewsForum: React.FC = () => {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://techpragyan-api.vercel.app/news");
      setNewsPosts(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
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
          {newsPosts.length > 0 ? (
            newsPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {/* User Info */}
                <div className="flex items-center mb-2">
                  <Image
                    src={post.userImg || "/default-user.svg"}
                    width={30}
                    height={30}
                    alt="User"
                    className="rounded-full"
                  />
                  <span className="ml-2 font-semibold text-lg">{post.user}</span>
                </div>

                {/* Post Image */}
                <Image
                  src={post.postImg || "/default-post.png"}
                  width={600}
                  height={400}
                  alt="Post"
                  className="rounded-lg object-cover w-full h-auto"
                />

                {/* Post Title */}
                <h2 className="text-2xl md:text-3xl font-semibold mt-2">{post.title}</h2>

                {/* Post Content */}
                <p className="text-gray-600 text-lg md:text-xl mt-1">{post.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No news posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsForum;
