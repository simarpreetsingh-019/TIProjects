const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
    user: process.env.NEW_USER,
    host: process.env.NEW_HOST,
    database: process.env.NEW_DATABASE,
    password: process.env.NEW_PASSWORD,
    port: process.env.NEW_PORT,
});
console.log(' PostgreSQL with:', {
    user: process.env.NEW_USER,
    host: process.env.NEW_HOST,
    database: process.env.NEW_DATABASE,
    password: process.env.NEW_PASSWORD,
    port: process.env.NEW_PORT,
});
// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        // Return the new user, omitting the password
        
        const { password: _, ...userWithoutPassword } = newUser.rows[0];
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (!user.rows.length || !(await bcrypt.compare(password, user.rows[0].password))) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ username: user.rows[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
