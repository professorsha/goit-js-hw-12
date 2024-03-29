import axios from 'axios';

const API_KEY = '42710952-cb07850fe6c5f6774b64d780f';
const baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page, perPage) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}