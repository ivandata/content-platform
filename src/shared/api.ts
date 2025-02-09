import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query'

import { PhotosResponse } from './types.ts';

const API_URL = 'https://api.pexels.com/v1'
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const QUERY_KEYS = {
  PHOTOS: 'photos',
}

const searchPhotos = async (query: string, page: number = 1, perPage: number = 15) => {
  const endpoint = query ? `/search?query=${query}` : '/curated'
  const response = await fetch(`${API_URL}${endpoint}&page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch photos')
  }

  return response.json()
}

const getCuratedPhotos = async (page: number = 1, perPage: number = 15) => {
  const response = await fetch(`${API_URL}/curated?page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch photos')
  }

  return response.json()
}

const useSearchPhotos = (query: string, page: number = 1, perPage: number = 15): UseQueryResult<PhotosResponse> => {
  return useQuery({
    queryKey: [QUERY_KEYS.PHOTOS, query, page],
    queryFn: () => searchPhotos(query, page, perPage),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  })
}

const useCuratedPhotos = (page: number = 1, perPage: number = 15): UseQueryResult<PhotosResponse> => {
  return useQuery({
    queryKey: [QUERY_KEYS.PHOTOS, page],
    queryFn: () => getCuratedPhotos(page, perPage),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  })
}

export { QUERY_KEYS, useSearchPhotos, useCuratedPhotos }
