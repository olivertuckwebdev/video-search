import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 10,
    type: 'video',
    key: process.env.REACT_APP_API_KEY
  }
});
