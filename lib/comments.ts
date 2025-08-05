import { supabase, type Comment } from "./supabase"

export async function getComments(postSlug: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_slug", postSlug)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }

  // Organize comments into a tree structure
  const commentsMap = new Map<string, Comment>()
  const rootComments: Comment[] = []

  // First pass: create all comment objects
  data.forEach((comment) => {
    commentsMap.set(comment.id, { ...comment, replies: [] })
  })

  // Second pass: organize into tree structure
  data.forEach((comment) => {
    const commentObj = commentsMap.get(comment.id)!

    if (comment.parent_id) {
      const parent = commentsMap.get(comment.parent_id)
      if (parent) {
        parent.replies!.push(commentObj)
      }
    } else {
      rootComments.push(commentObj)
    }
  })

  return rootComments
}

export async function createComment(
  postSlug: string,
  authorName: string,
  authorEmail: string,
  content: string,
  parentId?: string,
): Promise<Comment | null> {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_slug: postSlug,
      author_name: authorName,
      author_email: authorEmail,
      content,
      parent_id: parentId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating comment:", error)
    return null
  }

  return data
}

export async function likeComment(commentId: string): Promise<boolean> {
  const { error } = await supabase.rpc("increment_comment_likes", {
    comment_id: commentId,
  })

  if (error) {
    console.error("Error liking comment:", error)
    return false
  }

  return true
}
