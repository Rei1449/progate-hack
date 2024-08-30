use anyhow::Result;
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};

use ::r2d2::PooledConnection;
use dotenv::dotenv;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;
pub type PooledPgConnection = PooledConnection<ConnectionManager<PgConnection>>;

fn database_uri() -> Result<String> {
    dotenv().ok();

    let uri = std::env::var("DATABASE_URL")?;
    Ok(uri)
}

pub fn establish_connection() -> Result<Pool> {
    let uri = database_uri()?;

    let manager = ConnectionManager::<PgConnection>::new(uri);
    let pool = r2d2::Pool::builder().build(manager)?;
    Ok(pool)
}