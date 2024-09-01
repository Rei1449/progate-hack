CREATE TABLE user_voices (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    qiita_id TEXT NOT NULL,
    title TEXT NOT NULL
)
