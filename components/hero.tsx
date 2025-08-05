import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="border-b bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-6 text-amber-400">
            Frontend Engineer &<span className="text-green-300"> Web Enthusiast</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Hi, I'm Alex Chen. I build modern web applications with React, TypeScript, and Next.js. I'm passionate about
            performance, accessibility, and creating delightful user experiences.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button asChild>
              <Link href="/about">About Me</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#latest-posts">Read My Posts</Link>
            </Button>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
