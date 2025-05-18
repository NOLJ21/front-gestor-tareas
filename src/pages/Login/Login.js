import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5002/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            const me = await axios.get('http://localhost:5002/api/auth/me', {
                headers: { Authorization: `Bearer ${res.data.token}` }
            });
            localStorage.setItem('user', JSON.stringify(me.data));
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message || 'Error al iniciar sesión';
            setError(msg);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Inicio de Sesión</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">Entrar</button>
                <p className="register-link">
                    ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
