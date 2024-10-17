import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
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
