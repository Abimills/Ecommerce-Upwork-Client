import { CgArrowLongRightR } from "react-icons/cg";
import { PiCaretCircleRightLight } from "react-icons/pi";

const ForHer: React.FC = () => {
  return (
    <main className="w-full flex-col md:flex-row flex items-center mt-16 gap-10">
      <div className="flex  bg-alice-blue justify-start w-full md:w-1/2 ">
        <div className="w-full flex flex-col gap-2 p-3">
          <h1 className="text-3xl tracking-wider font-semibold mb-2 mt-4 ">
            Men Group Order for Friends or Wedding Ceremony
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
            Omnis quo tempora suscipit.
          </p>
          <button className="flex w-max hover:bg-indigo-300 p-2 rounded-full  items-center  gap-3 mb-20 tracking-wider text-sm border border-text-green-400 bg-indigo-400 text-white">
            Wanna CheckOut
            <CgArrowLongRightR />
          </button>
          <div className=" w-full flex items-center gap-7">
            <img
              src="../men87.png"
              alt=""
              className="w-24 h-24 rounded-full object-contain"
            />
            <div className=" flex flex-col  gap-2">
              <h3 className="text-gray-700 mb-1 ">Top group styles for men</h3>
              <p className="text-gray-400 text-sm ">
                Wedding,Holidays,Habesha Occasions
              </p>
            </div>
            <PiCaretCircleRightLight className="text-5xl text-green-300" />
          </div>
        </div>
        <div>
          <img
            className="w-40 h-96 object-contain"
            src="../men-32.png"
            alt=""
          />
        </div>
      </div>
      <div className="flex  bg-indigo-100 justify-start w-full md:w-1/2 ">
        <div className="w-full flex flex-col gap-2 p-3">
          <h1 className="text-3xl tracking-wider font-semibold mb-2 mt-4 ">
            Women Group Order for Friends or Wedding Ceremony
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
            Omnis quo tempora suscipit.
          </p>
          <button className="flex w-max p-2 rounded-full hover:bg-gray-100  items-center  gap-3 mb-20 tracking-wider text-sm border border-text-green-400 bg-white text-indigo-800">
            Wanna CheckOut
            <CgArrowLongRightR />
          </button>
          <div className=" w-full flex items-center gap-7">
            <img
              src="hab29.png"
              alt=""
              className="w-24 h-24 rounded-full object-contain"
            />
            <div className=" flex flex-col  gap-2">
              <h3 className="text-gray-700 mb-1 ">
                Top group styles for women
              </h3>
              <p className="text-gray-400 text-sm ">
                Wedding,Holidays,Habesha Occasions
              </p>
            </div>
            <PiCaretCircleRightLight className="text-4xl text-white" />
          </div>
        </div>
        <div>
          <img
            className="w-40 h-96 object-contain"
            src=" ../women44.png"
            alt=""
          />
        </div>
      </div>
    </main>
  );
};

export default ForHer;
