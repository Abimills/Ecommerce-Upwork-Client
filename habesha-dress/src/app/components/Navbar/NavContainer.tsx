"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavContainer: React.FC<Props> = ({ setIsOpen }) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  return (
    <div className="w-full h-full">
      {isSearching ? (
        <SearchBar setIsSearching={setIsSearching} setIsOpen={setIsOpen} />
      ) : (
        <Navbar setIsSearching={setIsSearching} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default NavContainer;
