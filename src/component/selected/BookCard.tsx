import { IdataType } from "@/type/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BookCardProps {
  book: IdataType;
}

const BookCard = ({book}:BookCardProps) => {
  return (

    <>
    <Link href={`/books/${book.bookId}`}>
    <div className="group overflow-hidden rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      {/* Image */}
      <div className="relative h-72 w-full overflow-hidden rounded-xl bg-[#F1F0EC]">
        <Image
          src={book.image}
          alt={book.bookName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#44403C] backdrop-blur-sm">
          {book.category}
        </span>
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* Book Name */}
        <h2 className="line-clamp-1 text-xl font-bold text-[#292524]">
          {book.bookName}
        </h2>

        {/* Author */}
        <p className="mt-1 text-sm text-[#78716C]">by {book.author}</p>

        {/* Rating + Pages */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-[#292524]">{book.rating}</span>
          </div>

          <span className="text-sm text-[#78716C]">
            {book.totalPages} pages
          </span>
        </div>

        {/* Review */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#57534E]">
          {book.review}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#E7E5E4] px-2.5 py-1 text-xs text-[#57534E]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-[#E7E5E4] pt-4">
          <div>
            <p className="text-xs text-[#A8A29E]">Publisher</p>
            <p className="text-sm font-medium text-[#44403C]">
              {book.publisher}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-[#A8A29E]">Published</p>
            <p className="text-sm font-medium text-[#44403C]">
              {book.yearOfPublishing}
            </p>
          </div>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
};

export default BookCard;
