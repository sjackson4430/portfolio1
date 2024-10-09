const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./auth');
const { runSecurityChecks } = require('./securityChecks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('frontend'));

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // In a real app, you'd check these against a database
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.get('/api/security-checks', authMiddleware, (req, res) => {
    const checks = runSecurityChecks();
    res.json(checks);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});