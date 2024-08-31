use serde::{Deserialize, Serialize};
use crate::schema::rooms::{self, name};
use diesel::prelude::*;

#[derive(Queryable, Insertable, Serialize, Deserialize)]
#[table_name="rooms"]
pub struct CreateRoom {
    pub name: String,
}

#[derive(Serialize, Queryable, Debug)]
pub struct RoomResponse {
    pub id: i32,
    pub name: String,
}

#[derive(Serialize)]
pub struct RoomsResponse {
    pub status: String,
    pub data: Vec<RoomResponse>
}
