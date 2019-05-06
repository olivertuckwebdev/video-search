import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';

class SearchBar extends Component {
  state = {
    searchTerm: ''
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Input
          type="search"
          placeholder="Search"
          value={this.state.searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
        />
      </Form>
    );
  }
}

export default SearchBar;
