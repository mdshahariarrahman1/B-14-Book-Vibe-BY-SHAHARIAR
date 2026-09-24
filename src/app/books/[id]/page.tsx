import ReadButton from "@/component/BookDetails/ReadButton";
import WishlistButton from "@/component/BookDetails/WishlistButton";
import { IdataType } from "@/type/page";
import Image from "next/image";
import { notFound } from "next/navigation";

interface IBooksReviewPage {
  params: Promise<{
    id: string;
  }>;
}

const getBookData = async (): Promise<IdataType[]> => {
  const res = await fetch(
    "http://localhost:3000/booksData.json"
  );

  return res.json();
};

const BooksReviewPage = async ({ params }: IBooksReviewPage) => {
  const { id } = await params;

  const booksData = await getBookData();

  const book = booksData.find(
    (books: IdataType) => String(books.bookId) === String(id)
  );

  if (!book) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-white px-4 py-10 md:px-6 lg:py-16">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg md:grid-cols-2">

        {/* ================= IMAGE ================= */}
        <div className="relative min-h-125 bg-[#F8FAFC] md:min-h-162.5">

          <Image
            src={book.image}
            alt={book.bookName}
            fill
            className="object-contain p-8 md:p-12"
            priority
          />

        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex flex-col justify-center px-7 py-10 md:px-12">

          {/* Book Name */}
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {book.bookName}
          </h1>

          {/* Author */}
          <p className="mt-4 text-lg text-gray-500">
            By :{" "}
            <span className="font-medium text-gray-700">
              {book.author}
            </span>
          </p>

          {/* Divider */}
          <div className="my-5 h-px bg-gray-200" />

          {/* Category */}
          <div>
            <p className="text-sm font-medium text-gray-500">
              Category
            </p>

            <p className="mt-2 text-base font-medium text-gray-800">
              {book.category}
            </p>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-gray-200" />

          {/* Review */}
          <p className="text-sm leading-7 text-gray-500">
            <span className="font-semibold text-gray-800">
              Review :
            </span>{" "}
            {book.review}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            <span className="font-semibold text-gray-700">
              Tags:
            </span>

            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
              >
                #{tag}
              </span>
            ))}

          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-gray-200" />

          {/* Book Information */}
          <div className="space-y-4 text-sm">

            <div className="flex justify-between gap-5">
              <span className="text-gray-500">
                Number of Pages:
              </span>

              <span className="font-semibold text-gray-800">
                {book.totalPages}
              </span>
            </div>

            <div className="flex justify-between gap-5">
              <span className="text-gray-500">
                Publisher:
              </span>

              <span className="text-right font-semibold text-gray-800">
                {book.publisher}
              </span>
            </div>

            <div className="flex justify-between gap-5">
              <span className="text-gray-500">
                Year of Publishing:
              </span>

              <span className="font-semibold text-gray-800">
                {book.yearOfPublishing}
              </span>
            </div>

            <div className="flex justify-between gap-5">
              <span className="text-gray-500">
                Rating:
              </span>

              <span className="font-semibold text-gray-800">
                ⭐ {book.rating}
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4 ">

            <ReadButton book={book} />

            <WishlistButton book={book} />

          </div>

        </div>

      </div>

    </section>
  );
};

export default BooksReviewPage;