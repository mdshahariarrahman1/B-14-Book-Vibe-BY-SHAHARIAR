"use client"

import { IdataType } from "@/type/page";
import { ReactNode, useState } from "react";
import { createContext } from "react";

interface BooksContextType {
  readBooks: IdataType[];
  setReadBooks: React.Dispatch<React.SetStateAction<IdataType[]>>;
  wishlist: IdataType[];
  setWishlist: React.Dispatch<React.SetStateAction<IdataType[]>>;
}

export const BooksContext = createContext<BooksContextType | null>(null);

function BooksProvider({children}:{children: ReactNode}) {

    const [readBooks, setReadBooks] = useState<IdataType[]>([]);
    const [wishlist, setWishlist] = useState<IdataType[]>([]);

    const shareData ={
        readBooks, 
        setReadBooks,
        wishlist,
        setWishlist,
    }


    return (
        <BooksContext.Provider value={shareData}>
            {children}
        </BooksContext.Provider>
    );
}

export default BooksProvider;