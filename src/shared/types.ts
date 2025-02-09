interface Photo {
  original: string;
  large: string;
  large2x: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

interface PhotoResource {
  id: string;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  avg_color: string;
  src: Photo;
  alt: string;
}

interface PhotosResponse {
  photos: PhotoResource[];
  page: number;
  per_page: number;
  total_results: number;
  next_page: number;
  prev_page: number;
}

export type { Photo, PhotoResource, PhotosResponse }