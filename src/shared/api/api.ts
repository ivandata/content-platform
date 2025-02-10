import { keepPreviousData, useInfiniteQuery, useQuery, UseQueryResult } from '@tanstack/react-query'

import type { PhotosResponse } from './types.ts';

const API_URL = 'https://api.pexels.com/v1'
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const QUERY_KEYS = {
  PHOTOS: 'photos',
  CURATED_PHOTOS: 'curated-photos',
}

const searchPhotos = async (query: string, page = 1, perPage = 15) => {
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

const getCuratedPhotos = async (page = 1, perPage = 15) => {
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

const useSearchPhotos = (query: string, page = 1, perPage = 15): UseQueryResult<PhotosResponse> => {
  return useQuery({
    queryKey: [QUERY_KEYS.PHOTOS, query, page],
    queryFn: () => searchPhotos(query, page, perPage),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  })
}

const useCuratedPhotos = (page = 1, perPage = 15): UseQueryResult<PhotosResponse> => {
  return useQuery<PhotosResponse>({
    queryKey: [QUERY_KEYS.PHOTOS, page],
    queryFn: () => getCuratedPhotos(page, perPage),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  })
}

const useInfiniteCuratedPhotos = (perPage = 15) => {
  return useInfiniteQuery<PhotosResponse>({
    queryKey: [QUERY_KEYS.CURATED_PHOTOS],
    queryFn: ({ pageParam = 1 }) => getCuratedPhotos(pageParam as number, perPage),
    getNextPageParam: (lastGroup) => lastGroup.page + 1,
    initialPageParam: 1,
  })
}

export { QUERY_KEYS, useSearchPhotos, useCuratedPhotos, useInfiniteCuratedPhotos }
