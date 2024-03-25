export default function calculateShipping(products: any) {
  if (products < 1) {
    throw new Error("Item count must be greater than 0");
  }

  const baseShippingCost = 44;
  const additionalItemCost = 22;

  const totalShippingCost =
    baseShippingCost + (products - 1) * additionalItemCost;

  return totalShippingCost;
}
