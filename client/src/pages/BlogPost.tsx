import React, { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBlogBySlug, type BlogPost as BlogPostType } from "@/lib/blogApi";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug!),
    enabled: Boolean(slug),
    retry: false,
  });

  // Reading progress + active section
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const { top, height } = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrolled = Math.max(0, Math.min(1, (windowHeight - top) / height));
      setReadingProgress(scrolled * 100);

      const headings = article.querySelectorAll("h2[id], h3[id]");
      let current = "";
      for (let i = headings.length - 1; i >= 0; i--) {
        const h = headings[i] as HTMLElement;
        if (h.getBoundingClientRect().top <= 100) {
          current = h.id;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Course Updates":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Career Tips":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "AI Trends":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Student Success":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "AI Education":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // Build table of contents from HTML
  const getTableOfContents = (content: string) => {
    const headings = content.match(/<h[23][^>]*id="([^"]*)"[^>]*>([^<]*)/g) || [];
    return headings.map((heading) => {
      const idMatch = heading.match(/id="([^"]*)"/);
      const textMatch = heading.match(/>([^<]*)/);
      const levelMatch = heading.match(/<h([23])/);
      return {
        id: idMatch ? idMatch[1] : "",
        text: textMatch ? textMatch[1].replace(/[🎯💼🔧📚📈🚀🏷️🏢🛠️🌐🤖🔄🎯🏗️💻🎓📚🛠️🚀🗺️⭐🌟🧠💻🤝💡⚖️🎯🏆]/g, "").trim() : "",
        level: levelMatch ? parseInt(levelMatch[1]) : 2,
      };
    });
  };

  // States
  if (isLoading) {
    return (
      <div className="font-sans text-white bg-black min-h-screen">
        <main className="pt-24 pb-16 text-center text-gray-400">Loading post…</main>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="font-sans text-white bg-black min-h-screen">
        <main className="pt-8 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">📝</div>
              <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
              <p className="text-gray-400 mb-8">The blog post you’re looking for doesn’t exist.</p>
              <Link
                to="/academy#blog"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Back to Knowledge Hub
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const toc = getTableOfContents(post.content);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    let shareUrl = "";
    if (platform === "linkedin") shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    if (platform === "twitter")  shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    if (platform === "facebook") shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="font-sans text-white bg-black min-h-screen">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1">
        <Progress value={readingProgress} className="h-full rounded-none" />
      </div>

      {/* Hero */}
      <section className="pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-6">
              <Link to="/academy#blog" className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm">
                ← Back to Knowledge Hub
              </Link>
            </nav>

            <div className={`inline-flex items-center mb-6 px-4 py-2 rounded-full border text-sm font-medium ${getCategoryColor(post.category)}`}>
              {post.category}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-gray-400 mb-4">{formatDate(post.date)}</p>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {post.author}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.read_time}
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-400">Share:</span>
              <div className="flex gap-3">
                <button onClick={() => shareOnSocial("linkedin")} className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button onClick={() => shareOnSocial("twitter")} className="group relative overflow-hidden bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button onClick={() => shareOnSocial("facebook")} className="group relative overflow-hidden bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-800/25 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* TOC */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {toc.length > 0 && (
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Table of Contents
                      </h3>
                      <nav className="space-y-2">
                        {toc.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                              item.level === 3 ? "ml-4" : ""
                            } ${
                              activeSection === item.id
                                ? "bg-indigo-600/20 text-indigo-300"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                            }`}
                          >
                            {item.text}
                          </button>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Card */}
                <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-pink-900/60 border-2 border-indigo-500/40 shadow-2xl shadow-indigo-900/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/50 transform hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-white mb-3 text-lg">Ready to Learn More?</h4>
                      <p className="text-sm text-gray-200 mb-5 leading-relaxed">
                        Explore our comprehensive AI courses designed for professionals like you.
                      </p>
                      <Link to="/academy#courses">
                        <Button
                          className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50"
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative z-10 flex items-center justify-center">
                            View Courses
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Article */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <article className="prose prose-lg prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-content enhanced-content"
                />
              </article>

              {/* Engagement */}
              <div className="mt-16 space-y-8">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Was this article helpful?</h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        variant={isHelpful === true ? "default" : "outline"}
                        onClick={() => setIsHelpful(true)}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Yes, helpful!
                      </Button>
                      <Button
                        variant={isHelpful === false ? "default" : "outline"}
                        onClick={() => setIsHelpful(false)}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                        Could be better
                      </Button>
                    </div>
                    {isHelpful !== null && (
                      <p className="mt-4 text-gray-400">
                        {isHelpful ? "Thank you for your feedback! 🎉" : "Thanks for the feedback. We'll improve it! 💪"}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Separator className="bg-gray-700" />

                {/* Back button */}
                <div className="text-center mt-16">
                  <Link to="/academy#blog">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 border-2 border-indigo-400/30"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span className="relative z-10">Back to Knowledge Hub</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
