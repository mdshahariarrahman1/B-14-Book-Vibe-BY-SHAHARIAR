"use client";

import { BooksContext } from "@/context/BooksContext";
import { IdataType } from "@/type/page";
import { useContext } from "react";
import { Bounce, toast } from "react-toastify";

interface BookssType {
  book: IdataType;
}

const WishlistButton = ({ book }: BookssType) => {
  const contextn = useContext(BooksContext);

  if (!contextn) {
    throw new Error("ReadButton must be used inside BooksProvider");
  }

  const { wishlist, setWishlist } = contextn;

  const handleReadBooks = () => {
    setWishlist([...wishlist, book]);

    toast.success(`🦄 You are wishlist by ${book.bookName}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <button
      onClick={handleReadBooks}
      type="button"
      className="rounded-lg bg-[#55B6D0] px-7 py-3 font-semibold text-white transition duration-300 hover:bg-[#3FA3BD] cursor-pointer"
    >
      Wishlist
    </button>
  );
};

export default WishlistButton;
