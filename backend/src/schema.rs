// @generated automatically by Diesel CLI.

diesel::table! {
    tags (id) {
        id -> Int4,
        title -> Varchar,
        user_id -> Text,
        // created_at -> Timestamp,
        // updated_at -> Timestamp,
    }
}

diesel::table! {
    times (id) {
        id -> Int4,
        time_second -> Int4,
        user_id -> Text,
        tag_id -> Int4,
        created_at -> Timestamp,
        // updated_at -> Timestamp,
    }
}

diesel::joinable!(times -> tags (tag_id));

diesel::allow_tables_to_appear_in_same_query!(
    tags,
    times,
);
