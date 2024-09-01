use actix_web::HttpResponse;
// use actix_web::http::StatusCode;
use actix_web::{get, post, web, Result};
// use std::env;
use diesel::prelude::*;
use crate::models::uservoicemodel::*;
use diesel::Connection;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    user_id: String,
}

fn db_connect() -> PgConnection {
    dotenv().ok();
    let db_url = std::env::var("DATABASE_URL").expect("Database Must Be Set");
    PgConnection::establish(&db_url).expect(&format!("Error connecting to {}", &db_url))
}


#[get("/qiita/{userid}")]
pub async fn get_user_qiita(info: web::Path<Info>) -> Result<HttpResponse> {
    use crate::schema::user_voices::dsl::*;
    let mut connection = db_connect();

    let data:Vec<UserVoiceResponse> = user_voices
        .filter(user_id.eq(info.user_id.clone()))
        .load(&mut connection)
        .unwrap();
    
    // let json_string = serde_json::to_string(&data).unwrap();

    // Ok(HttpResponse::Ok().json("Tag Create Success."))
    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": data })
            .to_string()
        )
    )
}
