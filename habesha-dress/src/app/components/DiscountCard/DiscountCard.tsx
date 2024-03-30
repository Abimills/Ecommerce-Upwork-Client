import { useRouter } from "next/navigation";
import React from "react";
import { MdDiscount } from "react-icons/md";

interface Item {
  img: string;
  title: string;
  desc: string;
}
interface Props {
  item: any;
}
const DiscountCard: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { _id, img, title, desc, discount, price } = item.products;
  const discountInPercent = (discount / price) * 100;
  return (
    <div
      onClick={() => router.push(`/singleProduct/${_id}`)}
      className="flex font-Dosis  h-48 rounded-lg  items-center justify-center
       gap-5 "
    >
      <img
        className="w-24 h-24 object-contain rounded-full hover:bg-yellow-300 bg-indigo-100"
        src={img}
        alt={title}
      />
      <div className=" flex  flex-col justify-start w-full hover:shadow-sm p-1">
        <h3 className="text-lg shadow-sm p-4   font-semibold text-green-400 mb-4">
          <MdDiscount className="hover:text-black" />
          <span className="hover:text-black">{`${discountInPercent.toFixed(
            0
          )}% discount`}</span>
        </h3>
        {/* <p className=" text-sm text-green-400"></p> */}
      </div>
    </div>
  );
};

export default DiscountCard;
