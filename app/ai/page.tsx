"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Send } from "lucide-react"
import { useState } from "react"

export default function AIPage() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      console.log("AI Input:", input)
      setIsLoading(false)
      // You can add actual AI processing here later
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">AI Assistant</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Ask me anything about frontend development, web technologies, or programming concepts.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">What can I help you with today?</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="pr-12 h-12 text-lg"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-10 w-10 p-0"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>

              {isLoading && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    Thinking...
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left bg-transparent"
                onClick={() => setInput("Explain React hooks and when to use them")}
              >
                <div>
                  <div className="font-medium">React Hooks</div>
                  <div className="text-sm text-muted-foreground">Learn about useState, useEffect, and more</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left bg-transparent"
                onClick={() => setInput("What are the best practices for TypeScript in React?")}
              >
                <div>
                  <div className="font-medium">TypeScript Best Practices</div>
                  <div className="text-sm text-muted-foreground">Tips for better type safety</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left bg-transparent"
                onClick={() => setInput("How to optimize web performance?")}
              >
                <div>
                  <div className="font-medium">Performance Optimization</div>
                  <div className="text-sm text-muted-foreground">Speed up your web applications</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left bg-transparent"
                onClick={() => setInput("Explain CSS Grid vs Flexbox")}
              >
                <div>
                  <div className="font-medium">CSS Layout</div>
                  <div className="text-sm text-muted-foreground">Grid vs Flexbox comparison</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>This AI assistant is designed to help with frontend development questions.</p>
        </div>
      </div>
    </div>
  )
}
