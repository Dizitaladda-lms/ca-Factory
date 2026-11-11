const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load .env from backend/src/.env or backend/.env
const envPaths = [
  path.join(__dirname, "..", ".env"),
  path.join(__dirname, "..", "..", ".env"),
  path.join(__dirname, "..", "..", "..", ".env"),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const pool = require("../config/db");

async function runMigrations() {
  console.log("Starting PostgreSQL Migration for Dizital Adda LMS...");

  if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is not set in environment variables!");
    process.exit(1);
  }

  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");

    console.log("Executing schema.sql...");
    await pool.query(schemaSql);
    const blogSql = fs.readFileSync(path.join(__dirname, "blog-module.sql"), "utf8");
    await pool.query(blogSql);
    console.log("Core schema and blog-module tables created successfully! ✅");
    process.exit(0);
  } catch (error) {
    console.error("Migration Failed! ❌", error);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;
