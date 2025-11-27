require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const imageRoutes = require("./routes/imageRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const quickBiteRoutes = require("./routes/quickBiteRoutes");
const clientReviewRoutes = require("./routes/clientReviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/productRoutes");
const careerRoutes = require("./routes/careerRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const teamRoutes = require("./routes/teamRoutes");
const whyChooseUsRoutes = require("./routes/whyChooseUsRoutes");
const caseStudyRoutes = require("./routes/caseStudyRoutes");
const whitepaperRoutes = require("./routes/whitepaperRoutes");
const reportRoutes = require("./routes/reportRoutes");
const newsRoutes = require("./routes/newsRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const webinarRoutes = require("./routes/webinarRoutes");
const helpRoutes = require("./routes/helpRoutes");
const tutorialRoutes = require("./routes/tutorialRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const aiFeatureRoutes = require("./routes/aiFeatureRoutes");
const aiGenRoutes = require("./routes/aiGenRoutes");
const aiDemoRoutes = require("./routes/aiDemoRoutes");
const partnerRoutes = require("./routes/partnerRoutes");

const app = express();

// Allowed origins - supports both local development and production domains
const allowedOrigins = [
  // Local development
  "http://localhost:3000",
  "http://localhost:3001",
  // Production domains
  "https://admin.codecafelab.in",
  "https://www.admin.codecafelab.in",
  "https://adminb.codecafelab.in",
  "https://www.adminb.codecafelab.in",
  "https://codecafelab.in",
  "https://www.codecafelab.in",
  // Development cloud environments
  "https://6000-firebase-studio-1747976034162.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev",
];

// CORS origin checker - supports both local and server domains
const isAllowedOrigin = (origin) => {
  if (!origin) return true; // allow curl/postman/direct API calls
  
  const normalizedOrigin = origin.replace(/\/$/, "").toLowerCase();
  
  // Allow all localhost ports for development
  if (normalizedOrigin.startsWith("http://localhost:") || 
      normalizedOrigin.startsWith("http://127.0.0.1:")) {
    return true;
  }
  
  // Check against allowed origins list
  return allowedOrigins.some((allowed) => {
    const normalizedAllowed = allowed.replace(/\/$/, "").toLowerCase();
    return normalizedOrigin === normalizedAllowed;
  });
};

// Configure CORS with proper preflight handling
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quick-bites", quickBiteRoutes);
app.use("/api/client-reviews", clientReviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/why-choose-us", whyChooseUsRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/whitepapers", whitepaperRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/webinars", webinarRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/newsletters", newsletterRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/ai", aiFeatureRoutes);
app.use("/api/ai-gen", aiGenRoutes);
app.use("/api/partners", partnerRoutes);

// Rate limiter for /ai-demo
const aiDemoLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many requests, please try again later." },
});

app.use("/ai-demo", aiDemoLimiter, aiDemoRoutes);

// Start server
const PORT = process.env.PORT || 9002; // Changed to 9002 as per allowedOrigins
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Allowed origins:', allowedOrigins);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});
