use actix_web::HttpResponse;
// use actix_web::http::StatusCode;
use actix_web::{get, post, web, Result};

use diesel::prelude::*;

use crate::models::voicemodel::*;

use diesel::Connection;

use diesel::pg::PgConnection;

use dotenv::dotenv;

use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    qiita_id: String,
}

fn db_connect() -> PgConnection {
    dotenv().ok();
    let db_url = std::env::var("DATABASE_URL").expect("Database Must Be Set");
    PgConnection::establish(&db_url).expect(&format!("Error connecting to {}", &db_url))
}



#[post("/qi")]
pub async  fn qi(info: web::Json<Info>) -> Result<HttpResponse> {
    // use create::schema::voices::dsl::*;
    // let mut connection = db_connect();

    // let voice_data = diesel::insert_into(voices)
    //     .values(&voice.into_inner())
    //     .get_result::<TimeResponse>(& mut connection)
    //     // .execute(& mut connection)
    //     .expect("Error inserting new time");

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": "time_data" } )
            .to_string()
        )
    )
}


