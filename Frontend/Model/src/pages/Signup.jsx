import React, { useState } from 'react';
import { Container, Form, Button,Alert } from 'react-bootstrap';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ text: data.message, type: 'success' });
                // Optionally clear the form
                setFormData({ username: '', name: '', email: '', password: '' });
            } else {
                setMessage({ text: data.message, type: 'danger' });
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage({ text: 'Failed to sign up. Please try again.', type: 'danger' });
        }
    };


    return (
        <Container className="mt-5">
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
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

                <Form.Group controlId="role" className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control 
                        as="select" 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        required 
                    >
                    <option value="">Select your role</option>
                    <option value="doctor">Doctor</option>
                    <option value="scientist">Lab Scientist</option>
                    </Form.Control>
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

                <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
        </Container>
    );
};

export default Signup;
