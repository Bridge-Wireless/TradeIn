
import React from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const  TradeLanding= () => {
  return (
    <Container className="text-center my-5">
      <h1>Trade In with Evergreen Wireless</h1>
      <p className="lead">
        At Evergreen Wireless, we believe that your mobile device should be more than just a phone.
        It should be a tool that enhances your life and helps you stay connected with the people
        and things that matter most. That’s why we offer the latest smartphones and accessories
        at competitive prices. Shop now and take your mobile experience to the next level.
      </p>
      <Button variant="light" size="lg" className="mt-3">
         <Link to="/trade-quote">Get Started</Link>  
      </Button>

      <Row className="my-5">
        <Col md={12}>
          <Image src={`${process.env.PUBLIC_URL}/images/trade.jpeg`} fluid />
        </Col>
       
      </Row>
    </Container>
  );
};

export default TradeLanding;
