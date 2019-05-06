import React from 'react';
import { Row, Col } from 'reactstrap';
import './SearchResult.scss';

const SearchResult = props => {
  function abbreviateNumber(number) {
    let SI_POSTFIXES = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
    let tier = (Math.log10(Math.abs(number)) / 3) | 0;
    if (tier === 0) return number;
    let postfix = SI_POSTFIXES[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    let formatted = scaled.toFixed(1) + '';
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2);
    return formatted + postfix;
  }

  return (
    <a href="/" className="search-result d-block">
      <Row noGutters>
        <Col md={6}>
          <img src={props.thumbnail} alt={props.alt} className="img-fluid" />
        </Col>
        <Col md={6} className="pl-3">
          <h3 className="title h6">{props.title}</h3>
          <h4 className="author text-secondary">{props.author}</h4>
          <span className="views font-weight-bold text-secondary">
            {abbreviateNumber(props.views)}
          </span>
        </Col>
      </Row>
    </a>
  );
};

export default SearchResult;
