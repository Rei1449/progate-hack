use actix_web::{get, App, HttpServer, HttpResponse};
use api::tagapi::{save_tag, get_tag, get_tag_all};
use api::timeapi::{get_month_tag, get_time, get_time_all, get_today_time, save_time};
use api::roomapi::{save_room, get_room_all};
use api::voiceapi::{save_qiita, save_qiita_tokio, testbinary};
use api::uservoiceapi::get_user_qiita;
use reqwest::Client;
use actix_cors::Cors;

mod api;
mod models;
mod schema;

// バイナリ形式でフロントに音声データを渡せた！
#[get("/vv")]
async fn vv_test() -> HttpResponse {
    println!("vv");
    let client = Client::new();
    let url = "https://vvtk3mgv4r.us-west-2.awsapprunner.com/audio_query?text=ずんだもんなのだ&speaker=3";
    let response = client
        .post(url)
        .header("Content-Type", "application/json")
        .send()
        .await
        .expect("Failed to send request");
    
    let synthesis_url = "https://vvtk3mgv4r.us-west-2.awsapprunner.com/synthesis?speaker=3";
    
    let synthesis_response = client
        .post(synthesis_url)
        .header("Content-Type", "application/json")
        .header("Accept", "audio/wav")
        .body(response)
        .send()
        .await
        .expect("Failed to send request");

    let audio_data = synthesis_response.bytes().await.unwrap();

    // HTTPレスポンスを返す
    HttpResponse::Ok().content_type("audio/wav").body(audio_data)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::permissive();

        App::new()
            .wrap(cors)
            .service(vv_test)
            .service(save_tag)
            .service(get_tag)
            .service(get_tag_all)
            .service(save_time)
            .service(get_time)
            .service(get_time_all)
            .service(get_today_time)
            .service(get_month_tag)
            .service(save_room)
            .service(get_room_all)
            .service(save_qiita)
            .service(testbinary)
            .service(save_qiita_tokio)
            .service(get_user_qiita)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
