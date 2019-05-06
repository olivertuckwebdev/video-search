import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import api from '../api/api';
import Header from './Header';
import Video from './Video';
import SearchResults from './SearchResults';

class App extends Component {
  state = { searchTerm: '', searchResults: [] };

  onSearchSubmit = async searchTerm => {
    const response = await api.get('/search', {
      params: {
        q: searchTerm
      }
    });

    this.setState({
      searchResults: response.data.items,
      searchTerm
    });
  };

  isSearch = () => {
    if (this.state.searchTerm) {
      return (
        <Container className="mt-5">
          <Row>
            <Col md={8}>
              <Video />
            </Col>
            <Col md={4}>
              <SearchResults searchResults={this.state.searchResults} />
            </Col>
          </Row>
        </Container>
      );
    }
  };

  render() {
    return (
      <div className="App">
        <Header onSearchSubmit={this.onSearchSubmit} />
        {this.isSearch()}
      </div>
    );
  }
}

export default App;
