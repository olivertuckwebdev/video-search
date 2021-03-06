import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = props => {
  const results = props.searchResults.map(({ id, snippet, statistics }) => {
    return (
      <SearchResult
        key={id}
        id={id}
        thumbnail={snippet.thumbnails.medium.url}
        thumbnailHigh={snippet.thumbnails.high.url}
        alt={snippet.title}
        title={snippet.title}
        author={snippet.channelTitle}
        views={statistics.viewCount}
        updateSelectedResult={props.updateSelectedResult}
      />
    );
  });

  return (
    <aside>
      <h2 className="mb-3 h5">Results</h2>
      {results}
    </aside>
  );
};

export default SearchResults;
