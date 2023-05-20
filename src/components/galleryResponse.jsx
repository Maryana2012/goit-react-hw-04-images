import axios from "axios";
const BASE_KEY = '34725568-3bb6c7550daf8cb631b41e469';
const BASE_URL = 'https://pixabay.com/api/'

export const getImages = async (query, page) => {
    const response = await axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${BASE_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    return response.data;
}
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12'
