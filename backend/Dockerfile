FROM rust:latest

WORKDIR /usr/src/app

# CMD ["cargo", "run"]

COPY . .

RUN cargo build --release

ENV PORT 8080

WORKDIR /usr/src/app/target/release

CMD ["./backend"]
