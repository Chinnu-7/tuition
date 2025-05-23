const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use a strong secret in production (store in .env file ideally)
const SECRET = 'c97c81e917ec64f2c124ba7cb317d79336467c7df5937e5612f1cb313816b08283301f4edd6486c6b591822de1d1ad77b0539395a4a548a1d428d925021e105b16170e403ebf4c1e0422b90ae503b1e5b5d65626e8beb3c5536dd24e735d8bb9eae72df05cef5bb8527dd47df5d2f67b592a3544df2c5c7a70769a188a85d3d2';

// In-memory user store (use MongoDB/PostgreSQL in real projects)
const users = [];

app.use(cors());
app.use(bodyParser.json());

// ✅ Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password and store user
    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });

    res.status(201).json({ message: 'User registered successfully' });
});

// ✅ Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// ✅ Protected route example
app.get('/api/profile', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(auth.split(' ')[1], SECRET);
        res.json({ username: decoded.username });
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
