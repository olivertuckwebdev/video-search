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
    searchResultsChannels: [],
    selectedResult: null,
    selectedResultChannel: null
  };

  onSearchSubmit = async searchTerm => {
    // Search for videos matching the search term
    const searchListResponse = await apiSearchList.get('/search', {
      params: {
        q: searchTerm
      }
    });

    // Get the id of each search result in an array then join them into a comma
    // separated list
    const searchListIds = searchListResponse.data.items
      .map(({ id }) => id.videoId)
      .join();

    // Get the videos matching the ids from the search results
    const videoListResponse = await apiVideoList.get('/videos', {
      params: {
        id: searchListIds
      }
    });

    // Get the channel id from each search result in an array then join them into a comma
    // separated list
    const searchListChannelIds = searchListResponse.data.items
      .map(({ snippet }) => snippet.channelId)
      .join();

    // Get the channels matching the ids
    const channelListResponse = await apiChannelList.get('/channels', {
      params: {
        id: searchListChannelIds
      }
    });

    // Get the channel pertaining to first search result
    const selectedResultChannel = channelListResponse.data.items.filter(
      channel =>
        channel.id === videoListResponse.data.items[0].snippet.channelId
    );

    // Update the application state to contain the search results, search term,
    // selected result (first result in this case), and the channel of the selected result
    this.setState({
      searchResults: videoListResponse.data.items,
      searchResultsChannels: channelListResponse.data.items,
      searchTerm,
      selectedResult: videoListResponse.data.items[0],
      selectedResultChannel: selectedResultChannel[0]
    });

    navigate(`/video/${this.state.selectedResult.id}`);
  };

  updateSelectedResult = id => {
    // Get the id of the clicked result and retrieve the search results pertaining to that id
    const selectedResult = this.state.searchResults.filter(
      result => result.id === id
    );

    // Get the id of the channel of the new selected result and retreive the channel pertaining
    // to that result
    const selectedResultChannel = this.state.searchResultsChannels.filter(
      channel => channel.id === selectedResult[0].snippet.channelId
    );

    this.setState({
      selectedResult: selectedResult[0],
      selectedResultChannel: selectedResultChannel[0]
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
