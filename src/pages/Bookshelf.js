import React, { useEffect, useState } from 'react'
import Card from '../components/Card';

const Bookshelf = () => {
    const [res,setRes]=useState([]);
    const books=JSON.parse(localStorage.getItem('books'));
    useEffect(()=>{
         setRes(books);
    },[]);
    const handleBookRemoval = (title) => {
        const updatedBooks = books.filter(book => book.title !== title);
        setRes(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    };
  return (
    <div className='h-full flex flex-col'>
        <div className='m-4 h-20'>
            <p className='h-4 text-4xl font-medium text-center py-4'>BookShelf</p>
        </div>
        <div className='flex flex-wrap gap-2 h-full w-full p-8'>
        {res && res.map((book)=>(<Card key={book.title}  book={book} flag={true} onRemove={handleBookRemoval}/>))}
    </div>
    </div>
    
  )
}

export default Bookshelf
