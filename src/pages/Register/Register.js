import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:5002/api/auth/register', form);
            navigate('/login');
        } catch (err) {
            const msg = err.response?.data?.message || 'Error en el registro';
            setError(msg);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Crear Cuenta</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

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

                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
