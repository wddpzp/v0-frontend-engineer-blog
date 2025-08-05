"use client"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle, Reply, Heart, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { getComments, createComment, likeComment, type Comment } from "@/lib/comments"
import { useToast } from "@/hooks/use-toast"

interface CommentSectionProps {
  postSlug: string
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const [newComment, setNewComment] = useState({
    author: "",
    email: "",
    content: "",
  })

  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [replyAuthor, setReplyAuthor] = useState("")
  const [replyEmail, setReplyEmail] = useState("")

  // Load comments on component mount
  useEffect(() => {
    loadComments()
  }, [postSlug])

  const loadComments = async () => {
    setLoading(true)
    const fetchedComments = await getComments(postSlug)
    setComments(fetchedComments)
    setLoading(false)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.author || !newComment.email || !newComment.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    const comment = await createComment(postSlug, newComment.author, newComment.email, newComment.content)

    if (comment) {
      toast({
        title: "Success",
        description: "Your comment has been posted!",
      })
      setNewComment({ author: "", email: "", content: "" })
      await loadComments() // Reload comments to show the new one
    } else {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    }

    setSubmitting(false)
  }

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !replyAuthor || !replyEmail) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const reply = await createComment(postSlug, replyAuthor, replyEmail, replyContent, parentId)

    if (reply) {
      toast({
        title: "Success",
        description: "Your reply has been posted!",
      })
      setReplyContent("")
      setReplyAuthor("")
      setReplyEmail("")
      setReplyingTo(null)
      await loadComments() // Reload comments to show the new reply
    } else {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLike = async (commentId: string) => {
    const success = await likeComment(commentId)

    if (success) {
      // Optimistically update the UI
      const updateCommentLikes = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 }
          }
          if (comment.replies) {
            return { ...comment, replies: updateCommentLikes(comment.replies) }
          }
          return comment
        })
      }

      setComments(updateCommentLikes(comments))

      toast({
        title: "Liked!",
        description: "Thanks for your feedback!",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to like comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getTotalCommentCount = (comments: Comment[]): number => {
    return comments.reduce((count, comment) => {
      return count + 1 + (comment.replies ? getTotalCommentCount(comment.replies) : 0)
    }, 0)
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <Card key={comment.id} className={isReply ? "ml-8 mt-4" : ""}>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar className={isReply ? "h-8 w-8" : ""}>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className={isReply ? "text-xs" : ""}>{getInitials(comment.author_name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className={`font-semibold ${isReply ? "text-sm" : ""}`}>{comment.author_name}</h4>
              <span className={`text-muted-foreground ${isReply ? "text-xs" : "text-sm"}`}>
                {formatDate(comment.created_at)}
              </span>
            </div>
            <p className={`mb-3 leading-relaxed ${isReply ? "text-sm" : ""}`}>{comment.content}</p>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment.id)}
                className="text-muted-foreground hover:text-primary"
              >
                <Heart className="h-4 w-4 mr-1" />
                {comment.likes}
              </Button>
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Button>
              )}
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <Input
                    value={replyAuthor}
                    onChange={(e) => setReplyAuthor(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                  <Input
                    type="email"
                    value={replyEmail}
                    onChange={(e) => setReplyEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={3}
                  className="mb-3"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                    Post Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyContent("")
                      setReplyAuthor("")
                      setReplyEmail("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Render Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">{comment.replies.map((reply) => renderComment(reply, true))}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <section className="mt-16 border-t pt-12">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section className="mt-16 border-t pt-12">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Comments ({getTotalCommentCount(comments)})</h2>
      </div>

      {/* Comment Form */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">Leave a Comment</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Name *</Label>
                <Input
                  id="author"
                  value={newComment.author}
                  onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Comment *</Label>
              <Textarea
                id="content"
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Comment"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">{comments.map((comment) => renderComment(comment))}</div>

      {comments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  )
}
