use serde::{Deserialize, Serialize};
use crate::schema::tags;
use diesel::prelude::*;

#[derive(Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "tags"]
pub struct CreateTag {
    pub title: String,
    pub user_id: String
}

// use this struct to mapping value
#[derive(Serialize, Queryable, Debug)]
pub struct TagResponse {
    pub id: i32,
    pub title: String,
    pub user_id: String,
}

// use this struct to respresent data on response
#[derive(Serialize)]
pub struct TagsResponse {
    pub status: String,
    pub data: Vec<TagResponse>
}