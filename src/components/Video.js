import React from 'react';
import './Video.scss';

const Video = props => {
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="video">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          title="video"
          src={`https://www.youtube.com/embed/${props.data.id}`}
          allowFullScreen
          className="embed-responsive-item"
        />
      </div>
      <header className="title py-3 border-bottom">
        <h1 className="h4">{props.data.snippet.title}</h1>
        <span className="text-secondary">
          {`${numberWithCommas(props.data.statistics.viewCount)} views`}
        </span>
      </header>
      <div className="description py-3 border-bottom">
        {props.data.snippet.description}
      </div>
    </div>
  );
};

export default Video;
