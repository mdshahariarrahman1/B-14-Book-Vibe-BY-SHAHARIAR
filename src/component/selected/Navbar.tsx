"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = (
    <>
      <li
        className={`px-4 py-2 rounded-lg cursor-pointer ${
          pathname === "/home"
            ? "border border-[#23BE0A] text-[#23BE0A]"
            : ""
        }`}
      >
        <Link href="/home">Home</Link>
      </li>

      <li
        className={`px-4 py-2 rounded-lg cursor-pointer ${
          pathname === "/listed-books"
            ? "border border-[#23BE0A] text-[#23BE0A]"
            : ""
        }`}
      >
        <Link href="/listed-books">Listed Books</Link>
      </li>

      <li
        className={`px-4 py-2 rounded-lg cursor-pointer ${
          pathname === "/pages-to-read"
            ? "border border-[#23BE0A] text-[#23BE0A]"
            : ""
        }`}
      >
        <Link href="/pages-to-read">Pages to Read</Link>
      </li>
    </>
  );

  return (
    <section className="container mx-auto flex justify-between items-center py-12.5">
      <div>
        <p className="text-[28px] font-bold">Books Vibe</p>
      </div>

      <ul className="flex gap-8 text-[18px] text-[#131313]">
        {links}
      </ul>

      <div className="flex gap-4 text-[18px] font-semibold items-center">
        <button className="px-4 py-2 bg-[#23BE0A] text-white rounded-lg">
          Sign In
        </button>

        <button className="px-4 py-2 bg-[#59C6D2] text-white rounded-lg">
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default Navbar;