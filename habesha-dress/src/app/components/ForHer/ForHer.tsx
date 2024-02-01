import { CgArrowLongRightR } from "react-icons/cg";
import { PiCaretCircleRightLight } from "react-icons/pi";

const ForHer: React.FC = () => {
  return (
    <main className="w-full flex items-center mt-16 gap-10">
      <div className="flex  bg-alice-blue justify-start w-1/2 ">
        <div className="w-full flex flex-col gap-2 p-3">
          <h1 className="text-3xl tracking-wider font-semibold mb-2 mt-4 ">
            Styles for Her
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
            Omnis quo tempora suscipit.
          </p>
          <button className="flex w-full items-center gap-3 mb-20 tracking-wider text-sm text-gray-400">
            Wanna CheckOut
            <CgArrowLongRightR />
          </button>
          <div className=" w-full flex items-center gap-7">
            <img
              src="../hab-jewelery.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className=" flex flex-col  gap-2">
              <h3 className="text-gray-700 mb-1 ">Top of the Jewelery Style</h3>
              <p className="text-gray-400 text-sm ">Most popular by women</p>
            </div>
            <PiCaretCircleRightLight className="text-2xl text-gray-500" />
          </div>
        </div>
        <div>
          <img src=" ../bea-girl.jpg" alt="" />
        </div>
      </div>
      <div className="flex  bg-beige-light justify-start w-1/2 ">
        <div className="w-full flex flex-col gap-2 p-3">
          <h1 className="text-3xl tracking-wider font-semibold mb-2 mt-4 ">
            Styles for Him
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
            Omnis quo tempora suscipit.
          </p>
          <button className="flex w-full items-center gap-3 mb-20 tracking-wider text-sm text-gray-400">
            Wanna CheckOut
            <CgArrowLongRightR />
          </button>
          <div className=" w-full flex items-center gap-7">
            <img
              src="../hab-jewelery.jpg"
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className=" flex flex-col  gap-2">
              <h3 className="text-gray-700 mb-1 ">Top of the Jewelery Style</h3>
              <p className="text-gray-400 text-sm ">Most popular by women</p>
            </div>
            <PiCaretCircleRightLight className="text-2xl text-gray-500" />
          </div>
        </div>
        <div>
          <img src=" ../bea-girl.jpg" alt="" />
        </div>
      </div>
    </main>
  );
};

export default ForHer;
