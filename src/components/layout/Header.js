import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

function Header() {
  return (
    <header style={headerStyle}>
      <Container fluid>
        <Row>
          <Col />
          <Col lg="auto">
            <h1 style={{ textAlign: 'center' }}>OLIPP</h1>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col ms="auto">
            <div style={{ display: 'inline' }}>
              <Link to="/">
                <Button
                  style={linkStyle}
                  variant="outline-light">
                  Home
                </Button>
              </Link>
              <Link to="/ipps">
                <Button
                  style={linkStyle}
                  variant="outline-light">
                  Ipps
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
            <Link to="/create">
              <Button
                style={createIppStyle}
                variant="outline-light">
                Create Ipp
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </header >
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '5px'
}

const createIppStyle = {
  color: '#fff',
  textDecoration: 'none',
  float: 'right',
  margin: '5px'
}

export default Header;
