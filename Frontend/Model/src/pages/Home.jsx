// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import './Home.css'; // Import your CSS file


const Home = () => {
    return (
        <div
            className="home-background"
        >
            <Container className="text-center">
                <h1>Welcome to CardioInsight</h1>
                <p className="lead">Use our AI model to get predictions based on your inputs!</p>
                <Row className="justify-content-center">
                    <Col md="auto">
                        <Link to="/signup">
                            <Button variant="primary" className="m-2">Sign Up</Button>
                        </Link>
                    </Col>
                    <Col md="auto">
                        <Link to="/login">
                            <Button variant="secondary" className="m-2">Login</Button>
                        </Link>
                    </Col>
                    <Col md="auto">
                        <Link to="/predict">
                            <Button variant="success" className="m-2">Get Prediction</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
