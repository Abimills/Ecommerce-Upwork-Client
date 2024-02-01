import { TfiArrowCircleRight } from "react-icons/tfi";

const Landing = () => {
  return (
    <main className="flex w-full  h-300 bg-alice-blue mt-10">
      <div className="flex   items-center flex-1  p-10">
        <div className="h-2/3 mr-8 mt-9 flex flex-col items-center justify-between ">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400  rounded-full"></div>
          <div className="w-9 h-9 border border-green-400 rounded-full flex items-center justify-center ">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          <div className="w-2 h-2 bg-gray-400  rounded-full"></div>
        </div>
        <div>
          <h1 className="text-left  w-full text-5xl mb-5 mt-16 leading-relaxed">
            SHOP HABESHA DRESS FOR ALL OCASSIONS
          </h1>
          <p className="text-gray-500 w-full text-left">
            Shop men,women,children dress for all your ocasions , <br /> we have
            it all in our stores
          </p>
          <div className="w-full mt-4">
            <button className=" border-2 border-gray-500 rounded-md p-2 pl-5">
              {" "}
              view more
            </button>
          </div>
        </div>
      </div>

      <div className="flex  justify-between items-center flex-1 p-10">
        <img
          className="w-70 h-90 rounded  object-contain "
          src="../dress.png"
          alt="girl"
        />
        <TfiArrowCircleRight className="text-2xl text-gray-400 " />
      </div>
    </main>
  );
};

export default Landing;
