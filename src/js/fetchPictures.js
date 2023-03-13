// import axios from 'axios';

const API_KEY = '34346691-066ec8be9ab970c052f0d3dfc';
const URL = 'https://pixabay.com/api/';
let page = 1;

export const fetchPictures = async (title) => {
    const searchFilters = new URLSearchParams({
        key: API_KEY,
        q: title,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: page * 40,
    })
    const response = await fetch(`${URL}?${searchFilters}`);
    return response.data;
}
