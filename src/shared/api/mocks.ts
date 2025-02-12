import { faker } from '@faker-js/faker'

import { PhotoResource } from './types'

/**
 * Generates a fake photo resource matching the API structure
 */
const generatePhotoResource = (): PhotoResource => ({
  id: faker.string.uuid(),
  width: faker.number.int({ min: 300, max: 800 }),
  height: faker.number.int({ min: 300, max: 800 }),
  url: faker.internet.url(),
  photographer: faker.person.fullName(),
  photographer_url: faker.internet.url(),
  photographer_id: faker.string.uuid(),
  avg_color: faker.color.rgb(),
  src: {
    original: faker.image.url(),
    large: faker.image.url(),
    large2x: faker.image.url(),
    medium: faker.image.url(),
    small: faker.image.url(),
    portrait: faker.image.url(),
    landscape: faker.image.url(),
    tiny: faker.image.url(),
  },
  alt: faker.lorem.sentence(),
})

const generateEmptyPhotoResource = (overrides = {}): PhotoResource => ({
  id: '',
  width: 400,
  height: 300,
  url: '',
  photographer: '',
  photographer_url: '',
  photographer_id: '',
  avg_color: '#EEEEEE',
  src: {
    original: '',
    large: '',
    large2x: '',
    medium: '',
    small: '',
    portrait: '',
    landscape: '',
    tiny: '',
  },
  alt: '',
  ...overrides
});

const generateSkeletonPhotos = (count: number = 1): PhotoResource[] => {
  return Array(count).fill(null).map((_, index) =>
    generateEmptyPhotoResource({
      id: `skeleton-${index}`,
      width: faker.number.int({ min: 1000, max: 3000 }),
      height: faker.number.int({ min: 1000, max: 3000 }),
    })
  );
};

/**
 * Generates a list of fake photos
 */
const generatePhotoList = (count = 10): PhotoResource[] =>
  Array.from({ length: count }, generatePhotoResource)

export { generatePhotoResource, generatePhotoList, generateSkeletonPhotos, generateEmptyPhotoResource }