CREATE TABLE IF NOT EXISTS trainer_review_videos (
    id SERIAL PRIMARY KEY,
    trainer_name VARCHAR(160) NOT NULL,
    title VARCHAR(200),
    video_url TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS trainer_review_videos_published_order_idx
    ON trainer_review_videos (is_published, display_order);

CREATE TABLE IF NOT EXISTS student_reviews (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(160) NOT NULL,
    rank_or_attempt VARCHAR(200),
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    avatar TEXT,
    comment TEXT NOT NULL,
    trainer_name VARCHAR(160),
    subject VARCHAR(200),
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS student_reviews_published_order_idx
    ON student_reviews (is_published, display_order);
