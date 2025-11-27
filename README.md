# CCL Admin Panel Backend

A Node.js/Express backend API for the CodeCafe Lab admin panel.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

A `.env` file has been created with the following configuration:

- **Database Name**: `codecafe_admin`
- **Database Password**: `Antu@2252`
- **Server Port**: `9002`

The `.env` file includes:
- Database connection settings (DB_HOST, DB_USER, DB_PASS, DB_NAME)
- Server port configuration
- JWT secret key
- API base URL for URL shortener
- Optional Gemini API key for AI features

### 3. Database Setup

Make sure your MySQL database is running and the database `codecafe_admin` exists. You can create it using:

```sql
CREATE DATABASE IF NOT EXISTS codecafe_admin;
```

### 4. Run the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on port 9002 (or the port specified in your `.env` file).

### 5. Verify Installation

- Check the console for "Database connected successfully" message
- Server should be running on `http://localhost:9002`

## API Endpoints

The API includes endpoints for:
- Authentication (`/api/auth`)
- Blogs (`/api/blogs`)
- Products (`/api/products`)
- Careers (`/api/careers`)
- Teams (`/api/teams`)
- And many more...

See the routes folder for complete endpoint documentation.

## Notes

- The `.env` file is gitignored for security
- Make sure your MySQL server is running before starting the application
- JWT_SECRET should be changed to a secure random string in production