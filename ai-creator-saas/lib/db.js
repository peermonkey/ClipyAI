const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database connection pool
let pool = null;

// Connection configuration from environment variables
const connectionConfig = {
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'ai_creator_saas',
  password: process.env.PG_PASSWORD || 'password',
  port: process.env.PG_PORT || 5432,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Connect to PostgreSQL database
async function connectDB() {
  if (pool) {
    return pool;
  }

  try {
    pool = new Pool(connectionConfig);
    console.log('Connected to PostgreSQL database');
    return pool;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    throw error;
  }
}

// Execute a query with parameters
async function query(text, params = []) {
  try {
    await connectDB();
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

// Initialize the database with necessary tables
async function initDB() {
  try {
    await connectDB();
    console.log('Initializing PostgreSQL database...');

    // SQL script to create tables
    const schemaSQL = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        creator_type VARCHAR(50) NOT NULL,
        credits_balance INTEGER DEFAULT 150,
        subscription_plan VARCHAR(50) DEFAULT 'free',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Files table
      CREATE TABLE IF NOT EXISTS files (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_size BIGINT NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        s3_key VARCHAR(255) NOT NULL,
        s3_url TEXT NOT NULL,
        duration INTEGER,
        status VARCHAR(50) DEFAULT 'uploaded',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Transcriptions table
      CREATE TABLE IF NOT EXISTS transcriptions (
        id SERIAL PRIMARY KEY,
        file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
        transcript_text TEXT,
        language VARCHAR(10) DEFAULT 'en',
        confidence_score DECIMAL(5,2),
        processing_time INTEGER,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Clips table
      CREATE TABLE IF NOT EXISTS clips (
        id SERIAL PRIMARY KEY,
        file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_time INTEGER NOT NULL,
        end_time INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        s3_key VARCHAR(255),
        s3_url TEXT,
        thumbnail_url TEXT,
        status VARCHAR(50) DEFAULT 'processing',
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- AI Content table
      CREATE TABLE IF NOT EXISTS ai_content (
        id SERIAL PRIMARY KEY,
        clip_id INTEGER REFERENCES clips(id) ON DELETE CASCADE,
        content_type VARCHAR(50) NOT NULL,
        platform VARCHAR(50),
        content_text TEXT NOT NULL,
        prompt_used TEXT,
        model_used VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Credit Usage table
      CREATE TABLE IF NOT EXISTS credit_usage (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        action VARCHAR(100) NOT NULL,
        credits_used INTEGER NOT NULL,
        file_id INTEGER REFERENCES files(id) ON DELETE SET NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Projects table
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        content_type VARCHAR(50),
        total_clips INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_files_user_id ON files(user_id);
      CREATE INDEX IF NOT EXISTS idx_clips_file_id ON clips(file_id);
      CREATE INDEX IF NOT EXISTS idx_clips_user_id ON clips(user_id);
      CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
      CREATE INDEX IF NOT EXISTS idx_credit_usage_user_id ON credit_usage(user_id);
    `;

    await query(schemaSQL);
    console.log('✅ PostgreSQL database initialized with required tables and indexes');
  } catch (error) {
    console.error('❌ Error initializing PostgreSQL database:', error);
    throw error;
  }
}

// Close database connection pool (useful for testing or shutdown)
async function closeDB() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('Database connection pool closed');
  }
}

// Get database statistics
async function getDBStats() {
  try {
    await connectDB();
    const stats = {
      users: (await query('SELECT COUNT(*) FROM users')).rows[0].count,
      files: (await query('SELECT COUNT(*) FROM files')).rows[0].count,
      transcriptions: (await query('SELECT COUNT(*) FROM transcriptions')).rows[0].count,
      clips: (await query('SELECT COUNT(*) FROM clips')).rows[0].count,
      ai_content: (await query('SELECT COUNT(*) FROM ai_content')).rows[0].count,
      credit_usage: (await query('SELECT COUNT(*) FROM credit_usage')).rows[0].count,
      projects: (await query('SELECT COUNT(*) FROM projects')).rows[0].count,
    };
    return stats;
  } catch (error) {
    console.error('Error getting database stats:', error);
    throw error;
  }
}

// Export functions for use in other parts of the application
module.exports = {
  connectDB,
  query,
  initDB,
  closeDB,
  getDBStats,
};
