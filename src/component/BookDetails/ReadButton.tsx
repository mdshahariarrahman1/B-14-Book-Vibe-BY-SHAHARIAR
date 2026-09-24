"use client";

import { BooksContext } from "@/context/BooksContext";
import { IdataType } from "@/type/page";
import { useContext } from "react";
import { Bounce, toast } from "react-toastify";

interface BookssType {
  book: IdataType;
}

const ReadButton = ({ book }: BookssType) => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("ReadButton must be used inside BooksProvider");
  }

  const { readBooks, setReadBooks } = context;

  const handleReadBooks = () => {
    setReadBooks([...readBooks, book]);

    toast.success(`🦄You have read ${book.bookName}`, {
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
      type="button"
      onClick={handleReadBooks}
      className="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-900 hover:text-white cursor-pointer"
    >
      Read
    </button>
  );
};

export default ReadButton;
