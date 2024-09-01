use actix_web::HttpResponse;
use actix_web::{get, post, web, Result};
use diesel::prelude::*;
use crate::models::tagmodel::*;
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

#[post("/tag/create")]
pub async fn save_tag(tag: web::Json<CreateTag>) -> Result<HttpResponse> {
    use crate::schema::tags::dsl::*;
    let mut connection = db_connect();

    let tag_data = diesel::insert_into(tags)
        .values(&tag.into_inner())
        // .execute(& mut connection)
        .get_result::<TagResponse>(& mut connection)
        .expect("Error inserting new tag");

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": tag_data } )
            .to_string()
        )
    )

}
#[post("/tag")]
pub async fn get_tag(info: web::Json<Info>) -> Result<HttpResponse> {
    use crate::schema::tags::dsl::*;
    let mut connection = db_connect();

    let data:Vec<TagResponse> = tags
        // .select((id,title,user_id))
        .filter(user_id.eq(info.user_id.clone()))
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
#[get("/tag/all")]
pub async fn get_tag_all() -> Result<HttpResponse> {
    use crate::schema::tags::dsl::*;
    let mut connection = db_connect();

    let data:Vec<TagResponse> = tags
        .select((id,title,user_id))
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