import CartItem from "../../CartItem/CartItem";
import { data } from "./data";

const Cart = () => {
  return (
    <section className=" fixed top-0 right-0 bottom-0 w-96 bg-white shadow-lg ">
      <div className="">
        <h1 className="">SubTotal</h1>
        <h1 className="">$ 89.90</h1>
        <button className="">Go To Cart</button>
      </div>
      {data?.map((item: any) => {
        return <CartItem item={item} key={item.id} />;
      })}
    </section>
  );
};

export default Cart;
