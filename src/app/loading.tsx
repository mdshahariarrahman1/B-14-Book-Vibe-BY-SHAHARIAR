const Loading = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
        <div className="flex flex-col items-center">

          {/* Book Loader */}
          <div className="relative flex h-20 w-20 items-center justify-center">

            <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-gray-200 border-t-[#16B900]" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-[#16B900]">
              <span className="text-2xl">📖</span>
            </div>

          </div>

          {/* Loading Text */}
          <h2 className="mt-6 text-xl font-bold text-gray-800">
            Loading Books
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Please wait while we prepare your books...
          </p>

          {/* Dots */}
          <div className="mt-4 flex gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#16B900]" />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-[#16B900]"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-[#16B900]"
              style={{ animationDelay: "300ms" }}
            />
          </div>

        </div>
      </div>
    </main>
  );
};

export default Loading;