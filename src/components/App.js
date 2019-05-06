import React, { Component } from 'react';
import Header from './Header';
import api from '../api/api';

class App extends Component {
  state = { searchTerm: '', searchResults: [] };

  onSearchSubmit = searchTerm => {
    api.get('/search', {
      params: {
        q: searchTerm
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Header onSearchSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default App;
