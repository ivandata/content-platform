import { keepPreviousData, useInfiniteQuery, useQuery, UseQueryResult } from '@tanstack/react-query'

import type { PhotoResource, PhotosResponse } from './types.ts';

const API_URL = 'https://api.pexels.com/v1'
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const QUERY_KEYS = {
  PHOTOS: 'photos',
  CURATED_PHOTOS: 'curated-photos',
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

const getPhotoDetails = async (photoId: string): Promise<PhotoResource> => {
  const response = await fetch(`${API_URL}/photos/${photoId}`, {
    headers: {
      Authorization: API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch photo details')
  }

  return response.json()
}

const usePhotoDetails = (photoId: string): UseQueryResult<PhotoResource> => {
  return useQuery({
    queryKey: [QUERY_KEYS.PHOTOS, 'details', photoId],
    queryFn: () => getPhotoDetails(photoId),
    staleTime: 5 * 60 * 1000,
  })
}


export { QUERY_KEYS, useCuratedPhotos, useInfiniteCuratedPhotos, usePhotoDetails }
