import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import { Container, Row, Col } from 'reactstrap';
import apiSearchList from '../api/apiSearchList';
import apiVideoList from '../api/apiVideoList';
import apiChannelList from '../api/apiChannelList';
import Header from './Header';
import Video from './Video';
import SearchResults from './SearchResults';

class App extends Component {
  state = {
    searchTerm: '',
    searchResults: [],
    selectedResult: null,
    selectedResultChannel: null
  };

  onSearchSubmit = async searchTerm => {
    const searchListResponse = await apiSearchList.get('/search', {
      params: {
        q: searchTerm
      }
    });

    const searchListIds = searchListResponse.data.items
      .map(({ id }) => id.videoId)
      .join();

    const videoListResponse = await apiVideoList.get('/videos', {
      params: {
        id: searchListIds
      }
    });

    const channelListResponse = await apiChannelList.get('/channels', {
      params: {
        id: videoListResponse.data.items[0].snippet.channelId
      }
    });

    this.setState({
      searchResults: videoListResponse.data.items,
      searchTerm,
      selectedResult: videoListResponse.data.items[0],
      selectedResultChannel: channelListResponse.data.items[0]
    });

    navigate(`/video/${this.state.selectedResult.id}`);
  };

  updateSelectedResult = id => {
    const selectedResult = this.state.searchResults.filter(
      result => result.id === id
    );

    this.setState({
      selectedResult: selectedResult[0]
    });
  };

  isSearch = () => {
    if (this.state.searchTerm) {
      return (
        <Container className="py-5">
          <Row>
            <Col lg={8}>
              <main>
                <Router>
                  <Video
                    path="/video/:id"
                    data={this.state.selectedResult}
                    channelData={this.state.selectedResultChannel}
                  />
                </Router>
              </main>
            </Col>
            <Col lg={4} className="mt-4 mt-lg-0">
              <SearchResults
                searchResults={this.state.searchResults}
                updateSelectedResult={this.updateSelectedResult}
              />
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
