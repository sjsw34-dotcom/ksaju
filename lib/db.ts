import { sql } from "@vercel/postgres";
export { sql };

/*
 * Run this SQL once to set up the database (Vercel Postgres dashboard or psql):
 *
 * CREATE TABLE IF NOT EXISTS orders (
 *   id           SERIAL PRIMARY KEY,
 *   order_id     VARCHAR(255) UNIQUE NOT NULL,
 *   name         VARCHAR(255) NOT NULL,
 *   email        VARCHAR(255) NOT NULL,
 *   birth_date   VARCHAR(20)  NOT NULL,
 *   birth_time   VARCHAR(20)  DEFAULT 'unknown',
 *   gender       VARCHAR(10)  DEFAULT 'unknown',
 *   amount       INTEGER      NOT NULL DEFAULT 35000,
 *   status       VARCHAR(50)  NOT NULL DEFAULT 'pending',
 *   payment_key  VARCHAR(255),
 *   created_at   TIMESTAMPTZ  DEFAULT NOW(),
 *   updated_at   TIMESTAMPTZ  DEFAULT NOW()
 * );
 *
 * CREATE TABLE IF NOT EXISTS blog_posts (
 *   id         SERIAL PRIMARY KEY,
 *   slug       VARCHAR(100) UNIQUE NOT NULL,
 *   title      VARCHAR(255) NOT NULL,
 *   meta       VARCHAR(255),
 *   content    TEXT NOT NULL,
 *   category   VARCHAR(50),
 *   topic      VARCHAR(255),
 *   published  BOOLEAN DEFAULT true,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 */
