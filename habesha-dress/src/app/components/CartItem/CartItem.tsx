import React from "react";
interface Item {
  id: string;
  title: string;
  img: string;
  desc: string;
  price: string;
}
interface Props {
  item: Item;
}
const CartItem: React.FC<Props> = ({ item }) => {
  return <div>CartItem</div>;
};

export default CartItem;
