import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = props => {
  const results = props.searchResults.map(({ id, snippet }) => {
    return (
      <SearchResult
        key={id.videoId}
        thumbnail={snippet.thumbnails.medium.url}
        alt={snippet.title}
        title={snippet.title}
        author={snippet.channelTitle}
      />
    );
  });

  return (
    <aside>
      <h2 className="h5">Results</h2>
      {results}
    </aside>
  );
};

export default SearchResults;
