-- Your SQL goes here
CREATE TABLE times (
    id SERIAL PRIMARY KEY,
    time_second INT NOT NULL,
    user_id TEXT NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);