use actix_web::{get, App, HttpServer, Responder, HttpResponse};
// use actix_web::{actix, client};
use reqwest::Client;
type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

#[get("/")]
async fn index()  -> Result<impl Responder> {
// async fn index()  -> impl Responder {
    let client = Client::new(); // 1
    let url = "https://qiita.com/api/v2/items/0e2a5a3d047e6b08c811";
    let response = client
        .get(url)
        .header("Bearer", "トークン")
        .send()
        .await // 2
        .expect("Failed to send request");
    // let body = response.text().await; // 3
    let body = response
        .text()
        .await
        .expect("Failed to read response text"); // ここでResultをアンラップ
    println!("{:#?}", body);
    Ok(body)
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(index)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
