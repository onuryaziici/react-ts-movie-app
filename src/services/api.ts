import axios from 'axios';

// Ortam değişkeninden API anahtarını alıyoruz.
const apiKey = import.meta.env.VITE_API_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'tr-TR', // Verileri Türkçe almak için
  },
});

export default apiClient;