use actix_web::{get, App, HttpServer, Responder};


#[get("/")]
async fn index() -> impl Responder {
    "Hello world!"
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
