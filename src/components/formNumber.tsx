export const formatNumber = (num: number) => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
