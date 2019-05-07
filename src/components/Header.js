import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { IoLogoYoutube } from 'react-icons/io';
import SearchBar from './SearchBar';

const Header = props => {
  return (
    <header className="py-3 shadow-sm">
      <Container>
        <Row className="align-items-center">
          <Col
            md={3}
            className="d-flex justify-content-center justify-content-md-start"
          >
            <IoLogoYoutube size={32} className="text-primary" />
          </Col>
          <Col md={6} className="mt-3 mt-md-0">
            <SearchBar onSearchSubmit={props.onSearchSubmit} />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
