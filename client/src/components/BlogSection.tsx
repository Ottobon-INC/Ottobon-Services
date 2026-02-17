import React, { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAnimation } from "@/hooks/use-animation";
import { getBlogs, type BlogListItem } from "@/lib/blogApi";

const categories = ["All", "Course Updates", "Career Tips", "AI Trends", "Student Success"];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  // Animations
  const sectionRef = useAnimation("animate-fade-in");
  const headingRef = useAnimation("animate-slide-up");
  const searchRef = useAnimation("animate-slide-up delay-100");
  const filtersRef = useAnimation("animate-slide-up delay-200");
  const gridRef = useAnimation("animate-scale-in delay-300");

  // 👉 Fetch blogs from n8n
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const posts: BlogListItem[] = data ?? [];

  // Filter client-side (category + search)
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Course Updates":
        return "bg-blue-500/20 text-blue-300";
      case "Career Tips":
        return "bg-green-500/20 text-green-300";
      case "AI Trends":
        return "bg-purple-500/20 text-purple-300";
      case "Student Success":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <section id="blog" className="py-16 bg-black relative overflow-hidden" ref={sectionRef}>
      {/* BG effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4 bg-indigo-500/20 px-4 py-2 rounded-full">
            <span className="text-indigo-400 mr-2 text-xl">📚</span>
            <span className="text-indigo-300 font-medium text-sm uppercase tracking-wider">Knowledge Hub</span>
          </div>
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
          >
            Latest Insights & Updates
          </h2>
          <p className="text-center text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
            Stay updated with the latest trends in AI, career advice, and success stories from our learning community.
          </p>
        </div>

        {/* Search */}
        <div ref={searchRef} className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white backdrop-blur-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* States */}
        {isLoading && (
          <div className="text-center text-gray-400 py-12">Loading articles…</div>
        )}
        {isError && (
          <div className="text-center text-red-400 py-12">
            Couldn’t load articles. Please try again.
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700/50 group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  navigate(`/blog/${post.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className={`inline-flex items-center mb-3 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">{formatDate(post.date)}</p>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 font-medium transition-colors">
                    Read More
                    <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && !isError && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
