
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    signup: async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create(username, hashedPassword, (err) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'User  created' });
        });
    },
    login: (req, res) => {
        const { username, password } = req.body;
        User.findByUsername(username, async (err, results) => {
            if (err) return res.status(500).json(err);
            if (results.length === 0) return res.status(401).json({ message: 'User  not found' });

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    }
};

module.exports = authController;