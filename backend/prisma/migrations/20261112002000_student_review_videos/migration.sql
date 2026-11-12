ALTER TABLE student_reviews
    ADD COLUMN IF NOT EXISTS video_url TEXT;

ALTER TABLE student_reviews
    ALTER COLUMN comment DROP NOT NULL;
