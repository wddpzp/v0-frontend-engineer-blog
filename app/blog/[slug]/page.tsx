"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CommentSection } from "@/components/comment-section"

const blogPosts = {
  "modern-css-techniques": {
    title: "Modern CSS Techniques Every Frontend Developer Should Know",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["CSS", "Web Development", "Frontend"],
    content: `
# Modern CSS Techniques Every Frontend Developer Should Know

CSS has evolved tremendously in recent years, introducing powerful new features that make building responsive, maintainable layouts easier than ever. Let's explore some of the most impactful modern CSS techniques that every frontend developer should have in their toolkit.

## Container Queries: The Game Changer

Container queries allow you to apply styles based on the size of a containing element rather than the viewport. This is revolutionary for component-based architectures.

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## CSS Grid Subgrid

Subgrid allows nested grid items to participate in the parent grid's track sizing, solving many layout challenges we've faced for years.

\`\`\`css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.child-grid {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;
}
\`\`\`

## Cascade Layers

Cascade layers give you explicit control over the cascade, making it easier to manage styles in large applications.

\`\`\`css
@layer reset, base, components, utilities;

@layer components {
  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}
\`\`\`

## Logical Properties

Logical properties make your CSS more robust for internationalization by using logical directions instead of physical ones.

\`\`\`css
.element {
  margin-inline-start: 1rem; /* Instead of margin-left */
  padding-block: 2rem; /* Instead of padding-top and padding-bottom */
}
\`\`\`

## Conclusion

These modern CSS features represent a significant leap forward in web styling capabilities. By adopting these techniques, you'll write more maintainable, flexible, and future-proof CSS code.

The key is to start experimenting with these features in your projects and gradually incorporate them into your development workflow. The web platform continues to evolve, and staying current with these advances will make you a more effective frontend developer.
    `,
  },
  "react-performance-optimization": {
    title: "React Performance Optimization: Beyond useMemo and useCallback",
    date: "2024-01-08",
    readTime: "12 min read",
    tags: ["React", "Performance", "JavaScript"],
    content: `
# React Performance Optimization: Beyond useMemo and useCallback

While \`useMemo\` and \`useCallback\` are well-known React performance optimization tools, there are many other techniques that can significantly improve your application's performance. Let's explore advanced strategies that go beyond the basics.

## Code Splitting with React.lazy

Dynamic imports and React.lazy allow you to split your code at the component level, reducing initial bundle size.

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Virtualization for Large Lists

When rendering large lists, virtualization ensures only visible items are rendered in the DOM.

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index]}
      </div>
    )}
  </List>
);
\`\`\`

## React Compiler (Experimental)

The new React Compiler automatically optimizes your components, reducing the need for manual memoization.

\`\`\`jsx
// The compiler automatically optimizes this
function ExpensiveComponent({ data, filter }) {
  const filteredData = data.filter(item => 
    item.name.includes(filter)
  );
  
  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Concurrent Features

React 18's concurrent features like \`startTransition\` help prioritize urgent updates.

\`\`\`jsx
import { startTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value); // Urgent update
    
    startTransition(() => {
      setResults(searchData(value)); // Non-urgent update
    });
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      <ResultsList results={results} />
    </div>
  );
}
\`\`\`

## Bundle Analysis and Optimization

Regular bundle analysis helps identify optimization opportunities:

\`\`\`bash
# Analyze your bundle
npx webpack-bundle-analyzer build/static/js/*.js

# Or with Next.js
npm install @next/bundle-analyzer
\`\`\`

## Conclusion

Performance optimization is an ongoing process that requires understanding your application's specific bottlenecks. These advanced techniques, combined with proper measurement and monitoring, will help you build faster, more responsive React applications.

Remember: measure first, optimize second. Use React DevTools Profiler to identify actual performance issues before applying these optimizations.
    `,
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <article>
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
            </div>
            <CommentSection postSlug={params.slug} />
          </article>
        </div>
      </div>
    </div>
  )
}
