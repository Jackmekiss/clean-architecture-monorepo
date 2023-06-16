export const formatNumberMakeFriendly = (number: number) => {
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1).replace('.0', '')} m`;
  }
  if (number >= 10_000) {
    return `${(number / 1_000).toFixed(1).replace('.0', '')} k`;
  }
  return number.toString();
};
