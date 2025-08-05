import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Comment = {
  id: string
  post_slug: string
  author_name: string
  author_email: string
  content: string
  parent_id: string | null
  likes: number
  created_at: string
  updated_at: string
  replies?: Comment[]
}
