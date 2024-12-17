import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setError(null);
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        setLoading(true); // Set loading state
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, { username, password });
            setUsername(''); // Clear input fields
            setPassword('');
            alert('Signup successful! You can now log in.'); // Consider replacing this with UI feedback
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.'); // Display specific error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <button onClick={handleSignup} disabled={loading}>
                {loading ? 'Signing up...' : 'Signup'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default Signup;