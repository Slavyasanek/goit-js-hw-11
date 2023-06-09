import axios from 'axios';

const API_KEY = '34346691-066ec8be9ab970c052f0d3dfc';
const URL = 'https://pixabay.com/api/';

export const fetchPictures = async (title, page) => {
    const searchFilters = new URLSearchParams({
        key: API_KEY,
        q: title,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
    })
    const response = await axios.get(`${URL}?${searchFilters}`);
    return response.data;
}
