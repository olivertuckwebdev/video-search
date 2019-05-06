import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { IoLogoYoutube } from 'react-icons/io';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header className="py-3 shadow-sm">
      <Container>
        <Row className="align-items-center">
          <Col md={3}>
            <IoLogoYoutube size={32} className="text-primary" />
          </Col>
          <Col md={6}>
            <SearchBar />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
