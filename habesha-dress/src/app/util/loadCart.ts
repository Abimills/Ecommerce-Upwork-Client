const nullCheck = (val: any) => (val === "null" ? null : val);

export const loadUserCartFromLocalStorage = () => {
  const cartJson: any = localStorage.getItem("cart")
    ? nullCheck(localStorage.getItem("cart"))
    : null;
  if (cartJson) {
    return JSON.parse(cartJson);
  } else {
    return [];
  }
};
