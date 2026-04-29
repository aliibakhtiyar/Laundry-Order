import { PRICES } from "../config/constants.js";

export const calculateTotal = (items) => {
  let total = 0;

  items.forEach(item => {
    const price = PRICES[item.type] || 0;
    total += price * item.qty;
  });

  return total;
};