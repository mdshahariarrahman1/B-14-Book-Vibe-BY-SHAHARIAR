"use client";

import { BooksContext } from "@/context/BooksContext";
import { IdataType } from "@/type/page";
import { useContext } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarShapeProps,
  LabelList,
  Label,
  LabelProps,
  Tooltip,
} from "recharts";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "black",
];

// =========================
// Custom Bar Path
// =========================

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height}
    ${x + width / 2},${y + height / 3}
    ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3}
    ${x + (2 * width) / 3},${y + height}
    ${x + width},${y + height}
    Z`;
};

// =========================
// Custom Bar
// =========================

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index } = props;

  const color = colors[(index ?? 0) % colors.length];

  return (
    <path
      strokeWidth={props.isActive ? 5 : 0}
      d={getPath(
        Number(x),
        Number(y),
        Number(width),
        Number(height)
      )}
      stroke={color}
      fill={color}
      style={{
        transition: "stroke-width 0.3s ease-out",
      }}
    />
  );
};

// =========================
// Custom Label
// =========================

const CustomColorLabel = (props: LabelProps) => {
  const fill = colors[(props.index ?? 0) % colors.length];

  return <Label {...props} fill={fill} />;
};

// =========================
// Main Component
// =========================

const ReadBooksPage = () => {
  const IData = useContext(BooksContext);

  if (!IData) {
    throw new Error(
      "ReadBooksPage must be used inside BooksProvider"
    );
  }

  const { readBooks } = IData;

  // =========================
  // Chart Data
  // =========================

  const data = readBooks.map(
    (book: IdataType, index: number) => {
      return {
        name: book.bookName,
        uv: book.totalPages,
        pv: index + 1,
        amt: index + 1,
      };
    }
  );

  // =========================
  // Statistics
  // =========================

  const totalBooks = readBooks.length;

  const totalPages = readBooks.reduce(
    (total, book) => total + book.totalPages,
    0
  );

  const averagePages =
    totalBooks > 0
      ? Math.round(totalPages / totalBooks)
      : 0;

  // =========================
  // Empty State
  // =========================

  if (readBooks.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10 md:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <span className="text-3xl">📚</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            No Books Read Yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You haven t added any books to your reading list yet.
            Start reading a book and your reading progress will
            appear here.
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="container mx-auto px-4 py-8 md:px-8 md:py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
          Reading Statistics
        </p>

        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Pages to Read
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
          Track the books you are reading and see how many pages
          each book contains.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Books */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Books Reading
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {totalBooks}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              📚
            </div>
          </div>
        </div>

        {/* Total Pages */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Pages
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {totalPages}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
              📖
            </div>
          </div>
        </div>

        {/* Average Pages */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Average Pages
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {averagePages}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Chart Header */}
        <div className="border-b border-slate-100 px-5 py-5 md:px-7">
          <h2 className="text-xl font-bold text-slate-900">
            Books & Page Count
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Number of pages in each book you are reading.
          </p>
        </div>

        {/* Chart */}
        <div className="w-full overflow-x-auto px-2 py-8 md:px-6">
          <BarChart
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "420px",
              margin: "0 auto",
            }}
            responsive
            data={data}
            margin={{
              top: 30,
              right: 20,
              left: 10,
              bottom: 70,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <Tooltip
              cursor={{
                fill: "#f1f5f9",
                fillOpacity: 0.7,
              }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [
                `${value} pages`,
                "Pages",
              ]}
            />

            <XAxis
              dataKey="name"
              angle={-25}
              textAnchor="end"
              height={80}
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              width="auto"
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Bar
              dataKey="uv"
              shape={TriangleBar}
              activeBar
              radius={[8, 8, 0, 0]}
            >
              <LabelList
                content={CustomColorLabel}
                position="top"
              />
            </Bar>
          </BarChart>
        </div>
      </div>

      {/* Book List */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 md:px-7">
          <h2 className="text-xl font-bold text-slate-900">
            Your Reading List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Books currently added to your reading list.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {readBooks.map((book, index) => (
            <div
              key={book.bookId}
              className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50 md:px-7"
            >
              <div className="flex min-w-0 items-center gap-4">
                {/* Number */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                  {index + 1}
                </div>

                {/* Book Info */}
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-800 md:text-base">
                    {book.bookName}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {book.author}
                  </p>
                </div>
              </div>

              {/* Pages */}
              <div className="shrink-0 text-right">
                <p className="text-base font-bold text-green-600">
                  {book.totalPages}
                </p>

                <p className="text-xs text-slate-400">
                  pages
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReadBooksPage;