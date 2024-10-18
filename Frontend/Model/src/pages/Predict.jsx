import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Predict.css'; // Import your CSS file if needed
import axios from 'axios';

const Predict = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        condition: '',
        trestbps: '',
        chol: '',
        fbs: '',
        restecg: '',
        thalach: '',
        exang: '',
        oldpeak: '',
        slope: '',
        ca: '',
        thal: '',
    });

    const [responseMessage, setResponseMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage(null);
        setErrorMessage(null);

        try {
            // Make POST request to the Ballerina backend
            const response = await axios.post('http://localhost:8080/heart_disease/predictAndAddRecord', formData);
            setResponseMessage(response.data.message);  // Update response message based on API response
        } catch (error) {
            setErrorMessage("Prediction failed: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <div className='predictbackground'>
            <Container className="mt-5">
                <h2 className="text-center">Make a Prediction</h2>
                
                {/* Display success or error message */}
                {responseMessage && <Alert variant="success">{responseMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter your age"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Add other input fields as needed */}
                    <Form.Group controlId="formCondition">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control
                            as="select"
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select condition</option>
                            <option value="0">0 - At Least</option>
                            <option value="1">1 - Slightly Distressed</option>
                            <option value="2">2 - Medium Condition/pain</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formTrestbps">
                        <Form.Label>Resting Blood Pressure (in mm Hg)</Form.Label>
                        <Form.Control
                            type="number"
                            name="trestbps"
                            value={formData.trestbps}
                            onChange={handleChange}
                            placeholder="Enter resting blood pressure"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formChol">
                        <Form.Label>Serum Cholesterol (in mg/dl)</Form.Label>
                        <Form.Control
                            type="number"
                            name="chol"
                            value={formData.chol}
                            onChange={handleChange}
                            placeholder="Enter serum cholesterol"
                            required
                        />
                    </Form.Group>

                    {/* Other form fields */}
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Predict;
