use actix_web::HttpResponse;
use actix_web::{get, post, web, Result};
use diesel::prelude::*;
use crate::models::timemodel::*;
use diesel::Connection;
use diesel::pg::PgConnection;
use serde::Deserialize;
use std::collections::HashMap;
use dotenv::dotenv;

#[derive(Deserialize)]
struct Info {
    user_id: String,
}
#[derive(Deserialize)]
struct ManthInfo {
    tagid: i32,
    userid: String,
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

    let time_data = diesel::insert_into(times)
        .values(&time.into_inner())
        .get_result::<TimeResponse>(& mut connection)
        .expect("Error inserting new time");

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({ "text": time_data } )
            .to_string()
        )
    )
}
#[post("/time")]
pub async fn get_time(info: web::Json<Info>) -> Result<HttpResponse> {
    use crate::schema::times::dsl::*;;
    let mut connection = db_connect();

    println!("{}",info.user_id);

    let data:Vec<TimeResponse> = times
        .filter(user_id.eq(info.user_id.clone()))
        .load(&mut connection)
        .unwrap();
    
    let json_string = serde_json::to_string(&data).unwrap();

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!( json_string )
            .to_string()
        )
    )
}
#[get("/time/all")]
pub async fn get_time_all() -> Result<HttpResponse> {
    use crate::schema::times::dsl::*;
    let mut connection = db_connect();

    let data:Vec<TimeResponse> = times
        .select((id,time_second,user_id,tag_id,created_at))
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
#[get("time/today/{userid}")]
pub async fn get_today_time(path: web::Path<String>) -> Result<HttpResponse> {
    use crate::schema::times::dsl::*;
    let mut connection = db_connect();
    extern crate serde_json;
    use chrono::{Datelike, TimeZone, Utc};
    use chrono_tz::{Asia::Tokyo};

    let utc = Utc::now().naive_utc();
    let jst = Tokyo.from_utc_datetime(&utc);
    let today_start =  Tokyo.ymd(jst.year(), jst.month(), jst.day()).and_hms(0, 0, 0);
    let userid = path.into_inner();

    println!("{}",jst);
    println!("{}",today_start);

    let data:Vec<TimeResponse> = times
        .filter(created_at.gt(today_start))
        .filter(user_id.eq(userid))
        .load(&mut connection)
        .unwrap();

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!( data )
            .to_string()
        )
    )
}
#[get("time/month/{tagid}/{userid}")]
pub async fn get_month_tag(info: web::Path<ManthInfo>) -> Result<HttpResponse> {
    use crate::schema::times::dsl::*;
    let mut connection = db_connect();
    extern crate serde_json;
    use chrono::{Datelike, TimeZone, Utc};
    use chrono_tz::{Asia::Tokyo};

    let utc = Utc::now().naive_utc();
    let jst = Tokyo.from_utc_datetime(&utc);
    let month_start = Tokyo.ymd(jst.year(), jst.month(), 1).and_hms(0, 0, 0);
    let tagid = &info.tagid;
    let userid = &info.userid;

    let total_list:Vec<i32> = times
    .select(time_second)
    .filter(user_id.eq(userid))
    .filter(tag_id.eq(tagid))
    .load(&mut connection)
    .unwrap();
    let mut total: i128 = 0;
    for i in total_list{
        println!("{}",i);
        total += (i as i128);
    }

    let data:Vec<TimeResponse> = times
        .filter(created_at.gt(month_start))
        .filter(user_id.eq(userid))
        .filter(tag_id.eq(tagid))
        .load(&mut connection)
        .unwrap();

    let jst = Tokyo.from_utc_datetime(&chrono::Utc::now().naive_utc());
    let mut month:HashMap<u32, i128> = HashMap::new();
    
    for i in 1..32{
        month.insert(i, 0);
    }
    for d in &data{
        let day = d.created_at.day();
        if let Some(total_time) = month.get_mut(&day) {
            *total_time += d.time_second as i128;
        }
    }

    println!("{:#?}",month);

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(
            serde_json::json!({"allSeconds":total, "month":month })
            .to_string()
        )
    )
}
