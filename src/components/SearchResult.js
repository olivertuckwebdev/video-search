import React from 'react';
import { Row, Col } from 'reactstrap';
import './SearchResult.scss';

const SearchResult = props => {
  return (
    <a href="/" className="search-result d-block">
      <Row noGutters>
        <Col md={6}>
          <img src={props.thumbnail} alt={props.alt} className="img-fluid" />
        </Col>
        <Col md={6} className="pl-2">
          <h3 className="title h6">{props.title}</h3>
          <h4 className="author text-secondary">{props.author}</h4>
        </Col>
      </Row>
    </a>
  );
};

export default SearchResult;
