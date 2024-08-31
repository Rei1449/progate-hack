use actix_web::HttpResponse;
// use actix_web::http::StatusCode;
use actix_web::{get, post, web, Result};

// use std::env;
use diesel::prelude::*;

use crate::models::timemodel::*;

use diesel::Connection;

use diesel::pg::PgConnection;

use dotenv::dotenv;

// use actix_web::{ Data };
// use crate::database::Pool;

// use diesel::pg::PgConnection;
// use diesel::r2d2::{self, ConnectionManager};
// pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;
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

#[post("/time/create")]
pub async fn save_time(time: web::Json<CreateTime>) -> Result<HttpResponse> {
    use crate::schema::times::dsl::*;
    let mut connection = db_connect();

    diesel::insert_into(times)
        .values(&time.into_inner())
        .execute(& mut connection)
        .expect("Error inserting new time");

    Ok(HttpResponse::Ok().json("Time Create Success."))

}
#[get("/time")]
pub async fn get_time(info: web::Json<Info>) -> Result<HttpResponse> {
    use crate::schema::times::dsl::*;;
    let mut connection = db_connect();

    println!("{}",info.user_id);

    let data:Vec<TimeResponse> = times
        // .select((id,time_second,user_id,tag_id,created_at))
        .filter(user_id.eq(info.user_id.clone()))
        .load(&mut connection)
        .unwrap();
        // .optional();

        // for d in data{
        //     println!("{:?}",d);
        // }
    
    let json_string = serde_json::to_string(&data).unwrap();

    // Ok(HttpResponse::Ok().json("Tag Create Success."))
    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": json_string })
            .to_string()
        )
    )
}
#[get("/time/all")]
pub async fn get_time_all() -> Result<HttpResponse> {
    use crate::schema::times::dsl::*;;
    let mut connection = db_connect();

    let data:Vec<TimeResponse> = times
        .select((id,time_second,user_id,tag_id,created_at))
        .load(&mut connection)
        .unwrap();
    
    let json_string = serde_json::to_string(&data).unwrap();

    // Ok(HttpResponse::Ok().json("Tag Create Success."))
    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": json_string })
            .to_string()
        )
    )
}
