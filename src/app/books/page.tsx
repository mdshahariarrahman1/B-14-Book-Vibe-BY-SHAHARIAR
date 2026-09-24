import { IdataType } from '@/type/page';
import React from 'react';
import BookCard from '../../component/selected/BookCard';

const getBookData = async():Promise<IdataType[]> =>{
    const res = await fetch('http://localhost:3000/booksData.json');
    
    return res.json()
}

const BooksPage = async() => {

    const books:IdataType[] = await getBookData();

    return (
        <section className=' container mx-auto text-center mt-25'>
            <p className=' text-5xl font-bold mb-9'>Books</p>

            <div className=' grid grid-cols-3 gap-6 mb-28'>
                {
                    books.map((book, ind)=> <BookCard key={ind} book={book} />)
                }
            </div>

        </section>
    );
};

export default BooksPage;