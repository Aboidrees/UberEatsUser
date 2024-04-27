import {DEFAULT_IMAGE} from "./config/constants";

export const imageUrlCheck = (image: string[] | string) => {
  if (!image) return DEFAULT_IMAGE;
  if (typeof image === 'string' && image.startsWith('http')) {
    return image;
  }
  if (Array.isArray(image) && image[0].startsWith('http')) {
    return image[0];
  }

}