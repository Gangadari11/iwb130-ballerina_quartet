import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({  username: '', password: '' });
    const [responseMessage, setResponseMessage] = useState('');
    const navigate=useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make POST request to the Ballerina signup service
            const response = await axios.post('http://localhost:8080/auth/login', formData);
            setResponseMessage(response.data.message);
            setTimeout(() => {
                navigate('/');}, 2000); 
        } catch (error) {
            setResponseMessage("Login failed: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <div className='loginbg'>
        <Container className="mt-5">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Login</Button>
            </Form>
            {responseMessage && <p className="mt-3">{responseMessage}</p>}
        </Container>
        </div>
    );
};

export default Login;
