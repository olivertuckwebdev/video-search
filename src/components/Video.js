import React from 'react';

const Video = props => {
  return (
    <main>
      <h1>{props.data.snippet.title}</h1>
    </main>
  );
};

export default Video;
