import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38612525-9c00fd32cf86797bbff975221';

export const getImage = async (searchValue, page) => {
  const { data } = await axios({
    params: {
      q: searchValue,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data;
};
