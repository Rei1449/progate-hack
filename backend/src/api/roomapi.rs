use actix_web::HttpResponse;
use actix_web::{get, post, web, Result};
use diesel::prelude::*;
use crate::models::roommodel::*;
use diesel::Connection;
use diesel::pg::PgConnection;
use dotenv::dotenv;

fn db_connect() -> PgConnection {
    dotenv().ok();
    let db_url = std::env::var("DATABASE_URL").expect("Database Must Be Set");
    PgConnection::establish(&db_url).expect(&format!("Error connecting to {}", &db_url))
}

#[post("/room/create")]
pub async fn save_room(room: web::Json<CreateRoom>) -> Result<HttpResponse> {
    use crate::schema::rooms::dsl::*;
    let mut connection = db_connect();

    let room_data = diesel::insert_into(rooms)
        .values(&room.into_inner())
        .get_result::<RoomResponse>(& mut connection)
        .expect("Error inserting new room");

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": room_data } )
            .to_string()
        )
    )
}

#[get("/room/all")]
pub async fn get_room_all() -> Result<HttpResponse> {
    use crate::schema::rooms::dsl::*;
    let mut connection = db_connect();

    let data:Vec<RoomResponse> = rooms
        .select((id,name))
        .load(&mut connection)
        .unwrap();
    
    let json_string = serde_json::to_string(&data).unwrap();

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": json_string })
            .to_string()
        )
    )
}