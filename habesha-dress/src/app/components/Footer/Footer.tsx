import React from "react";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
const Footer = () => {
  const router = useRouter();
  const handleNavigation = (link: string) => {
    router.push(`/${link}`);
  };
  const handleDownloadTerms = () => {
    const pdfFile = "/terms.pdf";
    saveAs(pdfFile, "downloaded_file.pdf");
  };
  const handleDownloadCookies = () => {
    const pdfFile = "/cookies.pdf";
    saveAs(pdfFile, "downloaded_file.pdf");
  };
  const handleDownloadReturn = () => {
    const pdfFile = "/return-policy.pdf";
    saveAs(pdfFile, "downloaded_file.pdf");
  };
  const handleDownloadPrivacy = () => {
    const pdfFile = "/habeshaD-privatcy-policy.pdf";
    saveAs(pdfFile, "downloaded_file.pdf");
  };

  return (
    <section className="w-full flex items-center text-white font-base  flex-col  bg-black ">
      <div className=" w-full flex items-center gap-4  justify-between  p-8 text-sm  leading-5 border-y border-y-gray-300">
        <div className="hidden sm:inline">
          <h1 className=" mb-3">Company Info</h1>
          <h3
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            About Noami.net
          </h3>
        </div>

        <div className="">
          <h1 className="text-center mt-5 mb-3 pt-5"> Company Policy</h1>

          <p
            onClick={handleDownloadReturn}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Returns Policy{" "}
          </p>
          <p
            onClick={handleDownloadTerms}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Privacy Policy
          </p>
          <p
            onClick={handleDownloadTerms}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Term of Use
          </p>
          <p
            onClick={handleDownloadCookies}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Cookie Notice
          </p>
        </div>
        <div className="hidden sm:inline">
          <h1 className="text-center mt-5 mb-3 pt-5"> Recommended</h1>

          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Dresses{" "}
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Shoes
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Men Trousers
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            New Products
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            popular
          </p>
        </div>
        <div className="">
          <h1 className=" mt-5 mb-3 pt-5"> Pages</h1>

          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Home{" "}
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            All Products
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Categories
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            Contact
          </p>
          <p
            onClick={() => handleNavigation("")}
            className="mb-1 cursor-pointer hover:text-blue-400 hover:underline underline-offset-4"
          >
            About Us
          </p>
        </div>
      </div>
      <div className="w-full flex flex-wrap  items-center justify-around mt-4 mb-4">
        <img className=" h-32 object-contain" src="../payment.jpg" alt="" />
        <p className="text-sm">&copy; 2024 Noami. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
