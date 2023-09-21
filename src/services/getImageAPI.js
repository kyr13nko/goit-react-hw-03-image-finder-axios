const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38612525-9c00fd32cf86797bbff975221';

export const getImage = (searchValue, page) => {
  return fetch(
    `${BASE_URL}?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
