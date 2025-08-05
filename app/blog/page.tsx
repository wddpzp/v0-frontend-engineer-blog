import { BlogCard } from "@/components/blog-card"

const blogPosts = [
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques Every Frontend Developer Should Know",
    excerpt:
      "Explore the latest CSS features like container queries, cascade layers, and CSS Grid subgrid that are revolutionizing how we build responsive layouts.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["CSS", "Web Development", "Frontend"],
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance Optimization: Beyond useMemo and useCallback",
    excerpt:
      "Deep dive into advanced React performance techniques including code splitting, lazy loading, and the new React Compiler.",
    date: "2024-01-08",
    readTime: "12 min read",
    tags: ["React", "Performance", "JavaScript"],
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Better Code Architecture",
    excerpt:
      "Learn how to leverage TypeScript's type system to create more maintainable and scalable frontend applications.",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["TypeScript", "Architecture", "Best Practices"],
  },
  {
    slug: "web-accessibility-guide",
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    excerpt:
      "A practical approach to implementing WCAG guidelines and creating inclusive user experiences for all users.",
    date: "2023-12-25",
    readTime: "15 min read",
    tags: ["Accessibility", "UX", "Web Standards"],
  },
  {
    slug: "nextjs-app-router-migration",
    title: "Migrating to Next.js App Router: Lessons Learned",
    excerpt:
      "Real-world experience and best practices for migrating large applications from Pages Router to App Router.",
    date: "2023-12-18",
    readTime: "9 min read",
    tags: ["Next.js", "Migration", "React"],
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">All Posts</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts on frontend development, web technologies, and building great user experiences.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
