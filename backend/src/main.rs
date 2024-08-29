use std::{backtrace, str::Chars, panic};

use actix_web::http::header::{Accept, ACCEPT};
use actix_web::{get, post, web, App, HttpServer, Responder, HttpResponse};
// use actix_web::{actix, client};
use reqwest::Client;
use reqwest::header::{HeaderMap, CONTENT_TYPE};
use serde_json::Value;
use actix_cors::Cors;
use std::collections::HashMap;

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;
pub struct ReturnCheckBody {
    body_text: String,
    body_code: Vec<String>
}

fn check_body(body_data: Chars) -> ReturnCheckBody {
    let mut return_data = ReturnCheckBody {
        body_text: String::from(""),
        body_code: vec![]
    };
    let mut back_quotation_count = 0;
    let mut code_zone = false;
    let mut code_zone_start_n = false;
    let mut keep_code: Vec<char> = Vec::new();
    let mut befor_word = 'a';
    for ch in body_data{
        if befor_word != '`'{
            back_quotation_count = 0;
        }
        befor_word = ch;
        if ch == '`' { 
            back_quotation_count += 1;
            if back_quotation_count >= 3 {
                code_zone = !code_zone;
                back_quotation_count = 0;
                if code_zone {
                    code_zone_start_n = true;
                    return_data.body_text.pop();
                    return_data.body_text.pop();
                    // return_data.body_text.pop();
                    continue;
                } else {
                    keep_code.pop();
                    keep_code.pop();
                    // keep_code.pop();
                    return_data.body_code.push(keep_code.iter().collect());
                    keep_code = Vec::new();
                    let into_code_number = format!("```{}```",return_data.body_code.len()-1);
                    return_data.body_text.push_str(&into_code_number);
                    continue;
                }
            }
        }
        // '''で囲まれている箇所をコードとして保存
        if code_zone {
            if code_zone_start_n {
                if ch == '\n' {
                    code_zone_start_n = false;
                    continue;
                } else {
                    continue;
                }
            }
            keep_code.push(ch);
            continue;
        }
        return_data.body_text.push(ch);
    }
    return_data
}

async fn test_voicevox() -> HttpResponse {
    // let mut map = HashMap::new();
    // map.insert("speaker", "1");
    // map.insert("text", "aa");

    let client = Client::new();
    let url = "http://0.0.0.0:50021/audio_query?text=qqq&speaker=3";
    let response = client
        .post(url)
        .header("Content-Type", "application/json")
        // .json(&map)
        .send()
        .await;
        // .expect("Failed to send request");
    println!("{:?}",response);
    println!("test_voicevox");
    HttpResponse::Ok().content_type("application/json").body(r#"{"return":"ok"}"#)
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world! This is actix.")
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[get("/qiita")]
// async fn qiita()  -> Result<ReturnCheckBody> {
// async fn qiita()  -> impl Responder {
async fn qiita() -> HttpResponse {
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
    // println!("body");
    // println!("{:#?}", body);
    // println!("type \n {}", type_name_of_val(response));

    let mut return_data : String = "no data".to_string();
    // let mut return_vec = vec![];

    let mut response_data: ReturnCheckBody;

    let json_str = body.clone();
    // JSON文字列をValueに変換
    let v: Value = serde_json::from_str(&json_str).unwrap();
    // rendered_bodyをデコードして表示
    if let Some(rendered_body) = v.get("body") {    // マークダウンを取得
    // if let Some(rendered_body) = v.get("rendered_body") {    // html
        let decoded_html = rendered_body.as_str().unwrap();
        println!("{}", decoded_html);
        return_data = decoded_html.to_string();
        // for i in return_data.as_str().chars(){
        //     return_vec.push(i);
        // }
        let list_string = return_data.as_str().chars();
        response_data = check_body(list_string);
        // println!("\n{:?}",return_vec);
        println!("{:?}",response_data.body_text);
        println!("{:?}",response_data.body_code);
        // println!("{}",return_data.as_str(list_string, chars().count());
        // return Ok(response_data);
    } else {
        println!("No rendered_body found");
        let void_return = ReturnCheckBody {
            body_text: String::from(""),
            body_code: vec![]
        };
        response_data = void_return;
    }
    // print!("[:?]}",ret.texe);
    // Ok(ret)
    // return Ok(response_data);
    let json_string = format!(
        "{{\"text\":{},\"code\":{:?},\"arr\":{}}}",
        response_data.body_text,
        response_data.body_code,
        42
    );
    HttpResponse::Ok()
        .content_type("application/json")
        .body(serde_json::json!({ "text": response_data.body_text }).to_string())
}

#[post("/vv")]
async fn vv_test() -> HttpResponse {
    println!("vv");
    let client = Client::new();
    let url = "http://localhost:50021/audio_query?text=qqq&speaker=3";
    let response = match client
        .post(url)
        .header("Content-Type", "application/json")
        .send()
        .await
    {
        Ok(resp) => match resp.text().await {
            Ok(body) => body,
            Err(e) => format!("Failed to read response body: {:?}", e),
        },
        Err(e) => format!("Failed to send request: {:?}", e),
    };

    println!("Response: {:?}", response);

    // HTTPレスポンスを返す
    HttpResponse::Ok().content_type("application/json").body(format!(r#"{{"response": "{}"}}"#, response))
    // println!("{:?}",response);
    // println!("test_voicevox");
    // HttpResponse::Ok().content_type("application/json").body(r#"{"return":"ok"}"#)
    // test_voicevox().await;
    // HttpResponse::Ok().content_type("application/json").body(r#"{"return":"ok"}"#)
}
#[post("/voice")]
async fn voice() -> HttpResponse {
    let mut headers = HeaderMap::new();
    headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
    // map.insert("accept", "audio/wav");
    // map.insert("Content-Type", "application/json");
    let client = Client::new();
    let url = "http://localhost:50021/synthesis?speaker=3";
    let response = match client
        .post(url)
        .headers(headers)
        .send()
        .await
    {
        Ok(resp) => match resp.text().await {
            Ok(body) => body,
            Err(e) => format!("Failed to read response body: {:?}", e),
        },
        Err(e) => format!("Failed to send request: {:?}", e),
    };

    println!("Response: {:?}", response);

    // HTTPレスポンスを返す
    HttpResponse::Ok().content_type("application/json").body(format!(r#"{{"response": "{}"}}"#, response))

}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // panic::set_hook(Box::new(|panic_info| {
    //     let backtrace = backtrace::Backtrace::capture();
    //     eprintln!("Panic occurred: {:?}", panic_info);
    //     eprintln!("Backtrace: {:?}", backtrace);
    // }));

    HttpServer::new(|| {

        let cors = Cors::permissive();

        App::new()
            .wrap(cors)
            .service(hello)
            .service(qiita)
            .service(vv_test)
            .service(voice)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
