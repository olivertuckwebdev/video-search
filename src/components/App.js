import React, { Component } from 'react';
import Header from './Header';
import api from '../api/api';

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

  render() {
    return (
      <div className="App">
        <Header onSearchSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default App;
