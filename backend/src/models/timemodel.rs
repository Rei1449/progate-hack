use serde::{Deserialize, Serialize};
use crate::schema::times;
use diesel::prelude::*;

#[derive(Queryable, Insertable, Serialize, Deserialize)]
#[table_name = "times"]
pub struct CreateTime {
    pub time_second: i32,
    pub user_id: String,
    pub tag_id: i32,
}

// use this struct to mapping value
#[derive(Serialize, Queryable, Debug)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct TimeResponse {
    pub id: i32,
    pub time_second: i32,
    pub user_id: String,
    pub tag_id: i32,
    pub created_at: chrono::NaiveDateTime,
}

// use this struct to respresent data on response
#[derive(Serialize)]
pub struct TimesResponse {
    pub status: String,
    pub data: Vec<TimeResponse>
}