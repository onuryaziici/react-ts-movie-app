export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string; // Detay sayfası için şimdiden ekleyelim
}

// API'den gelen liste cevabının tamamını modellemek için
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
}