import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(
        `https://gnews.io/api/v4/search?q=movies&lang=en&country=us&max=9&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`
      );
      setNewsArticles(data.articles);
    } catch (error) {
      console.error("Failed to fetch news articles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="relative px-6 md:px-20 py-24 min-h-screen bg-gradient-to-b from-primary-1000 via-primary-950 to-primary-950 text-white">
      <h1 className="text-4xl font-extrabold my-12 text-center text-primary-100">
        Latest Entertainment News
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-bold text-primary-100 line-clamp-2 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-300 line-clamp-3">
                    {article.description || "No description available."}
                  </p>
                </div>

                <a
                  href={article.url}
                  target="_blank"
                  className="mt-4 inline-block text-sm text-blue-400 hover:underline"
                >
                  Read Full Article →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
