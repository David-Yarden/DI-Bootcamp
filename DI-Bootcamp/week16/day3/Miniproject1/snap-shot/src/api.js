import axios from "axios";

const API_KEY = import.meta.env.VITE_PEXELS_KEY;

export const fetchImages = async (query, perPage = 30, page = 1) => {
  const response = await axios.get(
    `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: API_KEY
      }
    }
  );
  return response.data.photos;
};
