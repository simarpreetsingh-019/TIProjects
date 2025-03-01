// src/components/Protected.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = ({ token }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage(response.data);
            } catch (error) {
                setMessage('Access denied or invalid token');
            }
        };

        fetchProtectedData();
    }, [token]);

    return (
        <div>
            <h2>Protected Content</h2>
            <p>{message}</p>
        </div>
    );
};

export default Protected;
