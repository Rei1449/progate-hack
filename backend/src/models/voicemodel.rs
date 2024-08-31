use serde::{Deserialize, Serialize};
use crate::schema::voices;
use diesel::prelude::*;

#[derive(Queryable, Insertable, Serialize, Deserialize)]
#[table_name="voices"]
pub struct CreateVoice {
    pub voice_data: Vec<u8>,
    pub qiita_id: String,
    pub title: String
}

#[derive(Serialize, Queryable, Debug)]
pub struct VoiceResponse {
    pub id: i32,
    pub voice_data: Vec<u8>,
    pub qiita_id: String,
    pub title: String
}

#[derive(Serialize)]
pub struct VoicesResponse {
    pub status: String,
    pub data: Vec<VoiceResponse>
}