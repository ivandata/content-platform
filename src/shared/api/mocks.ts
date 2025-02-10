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

/**
 * Generates a list of fake photos
 */
const generatePhotoList = (count = 10): PhotoResource[] =>
  Array.from({ length: count }, generatePhotoResource)

export { generatePhotoResource, generatePhotoList }