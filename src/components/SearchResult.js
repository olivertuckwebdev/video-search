import React from 'react';
import { Link } from '@reach/router';
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

  const linkOnClick = () => {
    props.updateSelectedResult(props.id);
  };

  return (
    <Link
      to={`/video/${props.id}`}
      onClick={linkOnClick}
      className="search-result d-block"
    >
      <Row noGutters>
        <Col sm={6}>
          <img
            src={props.thumbnail}
            alt={props.alt}
            className="img-fluid d-none d-lg-inline"
          />
          <img
            src={props.thumbnailHigh}
            alt={props.alt}
            className="img-fluid d-lg-none"
          />
        </Col>
        <Col sm={6} className="pl-sm-3 mt-3 mt-sm-0">
          <h3 className="title h6 text-body">{props.title}</h3>
          <h4 className="author text-secondary">{props.author}</h4>
          <span className="views font-weight-bold text-body">
            {abbreviateNumber(props.views)}
          </span>
        </Col>
      </Row>
    </Link>
  );
};

export default SearchResult;
