use serde::{Deserialize, Serialize};
use crate::schema::user_voices;
use diesel::prelude::*;

#[derive(Queryable, Insertable, Serialize, Deserialize)]
#[table_name="user_voices"]
pub struct CreateUserVoice {
    pub user_id: String,
    pub qiita_id: String,
    pub title: String
}

#[derive(Serialize, Queryable, Debug)]
pub struct UsserVoiceResponse {
    pub id: i32,
    pub user_id: String,
    pub qiita_id: String,
    pub title: String
}

#[derive(Serialize)]
pub struct UsserVoicesResponse {
    pub status: String,
    pub data: Vec<UsserVoiceResponse>
}
