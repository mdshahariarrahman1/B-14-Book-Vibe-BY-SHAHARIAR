"use client";

import { BooksContext } from "@/context/BooksContext";
import { useContext, useState } from "react";
import Image from "next/image";
import { MapPin, Users, FileText, ChevronDown } from "lucide-react";
import Link from "next/link";

const ListedPage = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("ListedPage must be used inside BooksProvider");
  }

  const { readBooks, wishlist } = context;

  
  const [activeTab, setActiveTab] = useState<"read" | "wishlist">("read");

  
  const [sortBy, setSortBy] = useState("rating");

  
  const books = activeTab === "read" ? readBooks : wishlist;

  
  const sortedBooks = [...books].sort((a, b) => {
    
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    
    if (sortBy === "pages") {
      return b.totalPages - a.totalPages;
    }

    
    if (sortBy === "year") {
      return a.yearOfPublishing - b.yearOfPublishing;
    }

    return 0;
  });

  return (
    <main className="container mx-auto px-4 md:px-0">
      {/* ================= Heading ================= */}
      <section className="mt-6 rounded-xl bg-[#F3F3F3] py-7 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Books</h1>
      </section>

      {/* ================= Sort By ================= */}
      <div className="flex justify-center py-6 md:py-7">
  <div className="relative">

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="cursor-pointer appearance-none rounded-lg bg-[#16B900] py-3 pl-5 pr-12 font-semibold text-white outline-none transition hover:bg-[#0fa500]"
    >
      <option value="">Sort By</option>
      <option value="rating">Sort By: Rating</option>
      <option value="pages">Sort By: Number of Pages</option>
      <option value="year">Sort By: Published Year</option>
    </select>

    {/* Dropdown Icon */}
    <ChevronDown
      size={20}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white"
    />

  </div>
</div>

      {/* ================= Tabs ================= */}
      <div className="mt-4 border-b border-gray-300">
        <div className="flex gap-2">
          {/* Read Books */}
          <button
            type="button"
            onClick={() => setActiveTab("read")}
            className={`rounded-t-lg border px-4 py-3 text-sm transition ${
              activeTab === "read"
                ? "border-gray-300 border-b-white bg-white font-medium text-gray-700"
                : "border-transparent text-gray-400"
            }`}
          >
            Read Books ({readBooks.length})
          </button>

          {/* Wishlist Books */}
          <button
            type="button"
            onClick={() => setActiveTab("wishlist")}
            className={`rounded-t-lg border px-4 py-3 text-sm transition ${
              activeTab === "wishlist"
                ? "border-gray-300 border-b-white bg-white font-medium text-gray-700"
                : "border-transparent text-gray-400"
            }`}
          >
            Wishlist Books ({wishlist.length})
          </button>
        </div>
      </div>

      {/* ================= Book List ================= */}
      <section className="mt-6 space-y-5 pb-10">
        {sortedBooks.length === 0 ? (
          /* ================= No Books ================= */
          <div className="py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-500">
              No books found
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              {activeTab === "read"
                ? "You haven't added any read books yet."
                : "You haven't added any wishlist books yet."}
            </p>
          </div>
        ) : (
          /* ================= Books ================= */
          sortedBooks.map((book) => (
            <div
              key={book.bookId}
              className="rounded-xl border border-gray-200 p-4 transition hover:shadow-md"
            >
              <div className="flex flex-col gap-5 md:flex-row">
                {/* ================= Book Image ================= */}
                <div className="flex h-42 w-full items-center justify-center rounded-xl bg-[#F3F3F3] md:h-42 md:w-42.5 md:shrink-0">
                  <Image
                    src={book.image}
                    alt={book.bookName}
                    width={120}
                    height={150}
                    className="h-36.25 w-auto object-contain"
                  />
                </div>

                {/* ================= Book Information ================= */}
                <div className="flex flex-1 flex-col">
                  {/* Book Name */}
                  <h2 className="text-xl font-bold text-gray-900">
                    {book.bookName}
                  </h2>

                  {/* Author */}
                  <p className="mt-2 text-sm text-gray-700">
                    By : {book.author}
                  </p>

                  {/* Tags + Year */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold">Tag</span>

                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#F0FAF0] px-3 py-1 text-xs font-medium text-[#16B900]"
                      >
                        #{tag}
                      </span>
                    ))}

                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={16} />
                      Year of Publishing: {book.yearOfPublishing}
                    </span>
                  </div>

                  {/* Publisher + Pages */}
                  <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Users size={17} />
                      Publisher: {book.publisher}
                    </span>

                    <span className="flex items-center gap-2">
                      <FileText size={17} />
                      Page {book.totalPages}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="mt-4 border-t border-gray-200" />

                  {/* Bottom Information */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {/* Category */}
                    <span className="rounded-full bg-[#E8F1FF] px-4 py-2 text-sm text-[#4285F4]">
                      Category: {book.category}
                    </span>

                    {/* Rating */}
                    <span className="rounded-full bg-[#FFF3DF] px-4 py-2 text-sm text-[#F5A623]">
                      Rating: {book.rating}
                    </span>

                    {/* View Details */}
                    <Link href={`/books/${book.bookId}`}>
                      <button
                        type="button"
                        className="rounded-full bg-[#16B900] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#0fa500]"
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default ListedPage;
