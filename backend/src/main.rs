use actix_web::{get, web, App, HttpServer, Responder, HttpResponse};
// use actix_web::{actix, client};
use reqwest::Client;
type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

use serde_json::Value;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world! This is actix.")
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[get("/qiita")]
async fn index()  -> Result<String> {
// async fn index()  -> impl Responder {
    let client = Client::new(); // 1
    let url = "https://qiita.com/api/v2/items/0e2a5a3d047e6b08c811";
    let response = client
        .get(url)
        // .header("Bearer", "トークン")
        .send()
        .await // 2
        .expect("Failed to send request");
    println!("response \n {:?}",response);
    // let body = response.text().await; // 3
    let body = response
        .text()
        .await
        .expect("Failed to read response text"); // ここでResultをアンラップ
    println!("body");
    println!("{:#?}", body);
    // println!("type \n {}", type_name_of_val(response));

    let mut return_data : String = "no data".to_string();
    let json_str = body.clone();
    // JSON文字列をValueに変換
    let v: Value = serde_json::from_str(&json_str).unwrap();
    // rendered_bodyをデコードして表示
    if let Some(rendered_body) = v.get("rendered_body") {
        let decoded_html = rendered_body.as_str().unwrap();
        println!("{}", decoded_html);
        return_data = decoded_html.to_string();
    } else {
        println!("No rendered_body found");
    }

    Ok(return_data)
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(index)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
