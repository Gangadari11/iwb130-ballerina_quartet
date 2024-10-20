//**********************************************************************************************************************************
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Predict.css'; // Import your CSS file if needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Predict = () => {
    const [formData, setFormData] = useState({
        age: '',
        sex: '', // 1 for male, 0 for female
        cp: '', // Chest pain type
        trestbps: '',
        chol: '',
        fbs: '', // Fasting blood sugar
        restecg: '', // Resting electrocardiographic results
        thalach: '',
        exang: '', // Exercise induced angina
        oldpeak: '',
        slope: '', // Slope of the peak exercise ST segment
        ca: '', // Number of major vessels
        thal: '' // Thalassemia
    });

    const navigate=useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert numeric fields to appropriate types
            const dataToSend = {
                age: parseInt(formData.age, 10) || 0,
                sex: parseInt(formData.sex, 10) || 0,
                cp: parseInt(formData.cp, 10) || 0,
                trestbps: parseInt(formData.trestbps, 10) || 0,
                chol: parseInt(formData.chol, 10) || 0,
                fbs: parseInt(formData.fbs, 10) || 0,
                restecg: parseInt(formData.restecg, 10) || 0,
                thalach: parseInt(formData.thalach, 10) || 0,
                exang: parseInt(formData.exang, 10) || 0,
                oldpeak: parseFloat(formData.oldpeak) || 0.0,
                slope: parseInt(formData.slope, 10) || 0,
                ca: parseInt(formData.ca, 10) || 0,
                thal: parseInt(formData.thal, 10) || 0
            };
    
            // Make POST request to the Ballerina service
            const response = await axios.post('http://localhost:8081/heart_disease/predictAndAddRecord', dataToSend);
    
            // Display the appropriate message based on the prediction
            if (response.data.prediction === 1) {
                alert("There might be an issue");
            } else if (response.data.prediction === 0) {
                alert("You are safe!");
            }
    
            // Optionally show the message returned by the server
            alert(response.data.message);
            setTimeout(() => {
                navigate('/');}, 2000); 
    
        } catch (error) {
            alert("Prediction failed: " + (error.response?.data?.message || "Unknown error"));
        }
    };
    


    return (
        <div className='predictbackground'>
        <Container className="mt-5">
            <h2 className="text-center">Make a Prediction</h2>
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
                        <option value="1">1 - Condition: Slightly Distressed</option>
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

                <Form.Group controlId="formFbs">
                    <Form.Label>Fasting Blood Sugar (greater than 120 mg/dl)</Form.Label>
                    <Form.Control
                        as="select"
                        name="fbs"
                        value={formData.fbs}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select fasting blood sugar</option>
                        <option value="0">0 - False</option>
                        <option value="1">1 - True</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formRestecg">
                    <Form.Label>Resting Electrocardiographic Results</Form.Label>
                    <Form.Control
                        as="select"
                        name="restecg"
                        value={formData.restecg}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select resting electrocardiographic results</option>
                        <option value="0">0 - Normal</option>
                        <option value="1">1 - ST-T wave abnormality</option>
                        <option value="2">2 - Left ventricular hypertrophy</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formThalach">
                    <Form.Label>Maximum Heart Rate Achieved</Form.Label>
                    <Form.Control
                        type="number"
                        name="thalach"
                        value={formData.thalach}
                        onChange={handleChange}
                        placeholder="Enter maximum heart rate achieved"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formExang">
                    <Form.Label>Exercise Induced Angina</Form.Label>
                    <Form.Control
                        as="select"
                        name="exang"
                        value={formData.exang}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select exercise induced angina</option>
                        <option value="0">0 - No</option>
                        <option value="1">1 - Yes</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formOldpeak">
                    <Form.Label>ST Depression Induced by Exercise Relative to Rest</Form.Label>
                    <Form.Control
                        type="number"
                        name="oldpeak"
                        value={formData.oldpeak}
                        onChange={handleChange}
                        placeholder="Enter ST depression value"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formSlope">
                    <Form.Label>Slope of the Peak Exercise ST Segment</Form.Label>
                    <Form.Control
                        as="select"
                        name="slope"
                        value={formData.slope}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select slope</option>
                        <option value="0">0 - Upsloping</option>
                        <option value="1">1 - Flat</option>
                        <option value="2">2 - Downsloping</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formCa">
                    <Form.Label>Number of Major Vessels Colored by Fluoroscopy</Form.Label>
                    <Form.Control
                        type="number"
                        name="ca"
                        value={formData.ca}
                        onChange={handleChange}
                        placeholder="Enter number of major vessels (0-3)"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formThal">
                    <Form.Label>Thalassemia</Form.Label>
                    <Form.Control
                        as="select"
                        name="thal"
                        value={formData.thal}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select thalassemia</option>
                        <option value="1">1 - Normal</option>
                        <option value="2">2 - Fixed Defect</option>
                        <option value="3">3 - Reversible Defect</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </div>
    );
};

export default Predict;
















