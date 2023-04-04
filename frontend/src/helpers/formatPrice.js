export const formatPrice = (price) => {
  if (typeof price === 'undefined' || price === null) return null;

  const numberPrice = typeof price === 'string' ? parseFloat(price) : price;

  return numberPrice?.toLocaleString('pl', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
  });
};
