export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK; ;

/**
get image url
* @param {any} image
 */

export const imageUrl = (image) => {
  if (!image) {
    return "./vercel.svg";
  }
  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }
  return image.url;
};

/**
convert to two Decimal float
* @param {number | string} number
 */

export const twoDecimals= (number) => parseFloat(number).toFixed(2)