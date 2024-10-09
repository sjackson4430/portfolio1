cat << EOF > infosec-app/backend/server.js
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { authMiddleware } = require('./auth');
const { securityHeaders } = require('./securityMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(securityHeaders);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the InfoSec Web Application');
});

app.get('/api/secure', authMiddleware, (req, res) => {
  res.json({ message: 'This is a secure endpoint' });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
EOF