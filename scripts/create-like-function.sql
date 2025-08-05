-- Create function to increment comment likes
CREATE OR REPLACE FUNCTION increment_comment_likes(comment_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE comments 
  SET likes = likes + 1 
  WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql;
