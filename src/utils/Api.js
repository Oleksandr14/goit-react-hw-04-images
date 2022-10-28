import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const KEY = '28021397-efd8f00a24064632ececcc08e';

export const getNewItems = (searchInput, page) => {
  return axios
    .get('/api/', {
      params: {
        q: searchInput,
        page: page,
        key: KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
    .then(res => res.data);
};

export const normalizeApi = hits => {
  return hits.map(obj => ({
    id: obj.id,
    webformatURL: obj.webformatURL,
    largeImageURL: obj.largeImageURL,
  }));
};
