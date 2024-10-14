import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './Home.css'; // Import your CSS file

const Home = () => {
    return (
        <div className="home-background">
            <Container className="text-center">
                <h1>Welcome to AI Predictor</h1>
                <p className="lead">Use our AI model to get predictions based on your inputs!</p>
                <div>
                    <Link to="/signup">
                        <Button variant="primary" className="m-2">Sign Up</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary" className="m-2">Login</Button>
                    </Link>
                    <Link to="/predict">
                        <Button variant="success" className="m-2">Get Prediction</Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default Home;
