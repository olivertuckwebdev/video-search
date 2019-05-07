import React, { Component } from 'react';
import Linkify from 'react-linkify';
import './Video.scss';

class Video extends Component {
  state = {
    fullDescription: false
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  toggleFullDescription = () => {
    this.setState({
      fullDescription: !this.state.fullDescription
    });
  };

  formatDate = date => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    let d = new Date(date).toLocaleDateString('en-GB', options);

    return d.toString();
  };

  render() {
    return (
      <div className="video">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="video"
            src={`https://www.youtube.com/embed/${this.props.data.id}`}
            allowFullScreen
            className="embed-responsive-item"
          />
        </div>
        <header className="title py-3 border-bottom">
          <h1 className="h4">{this.props.data.snippet.title}</h1>
          <span className="text-secondary">
            {`${this.numberWithCommas(
              this.props.data.statistics.viewCount
            )} views`}
          </span>
        </header>
        <div className="py-3 border-bottom">
          <div className="channel-info d-flex align-items-center">
            <img
              src={this.props.channelData.snippet.thumbnails.medium.url}
              alt={this.props.channelData.snippet.title}
              width={48}
              height={48}
              className="rounded-circle"
            />
            <div className="pl-2">
              <p className="mb-0 font-weight-bold">
                {this.props.channelData.snippet.title}
              </p>
              <p className="mb-0 text-secondary">
                {this.formatDate(this.props.data.snippet.publishedAt)}
              </p>
            </div>
          </div>
          <div
            className={`description mt-3 ${
              this.state.fullDescription ? 'open' : 'closed'
            }`}
          >
            <Linkify>{this.props.data.snippet.description}</Linkify>
          </div>
          <p
            onClick={this.toggleFullDescription}
            className="toggle-full-description mt-3 mb-0 text-uppercase text-secondary"
          >
            {this.state.fullDescription ? 'Show less' : 'Show more'}
          </p>
        </div>
      </div>
    );
  }
}

export default Video;
