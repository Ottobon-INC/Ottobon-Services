
import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/blogApi";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function BlogSectionTeaser() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['/api/blog-posts'],
    queryFn: () => blogApi.getAllPosts(),
  });

  const latestPosts = posts?.slice(0, 3) || [];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              Latest from the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Knowledge Hub
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Stay updated with insights and industry trends
            </p>
          </div>
          <Link
            href="/knowledge"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Explore All Articles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
        </div>

        {/* Blog Cards - Responsive Grid with Horizontal Scroll on Mobile */}
        {isLoading ? (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 flex-shrink-0 snap-start">
                <div className="animate-pulse bg-gray-800 rounded-xl h-96"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
            {latestPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 flex-shrink-0 snap-start"
              >
                <Card className="group h-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-indigo-500 transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span className="text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
