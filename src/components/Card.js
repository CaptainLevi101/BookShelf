import React from 'react'


const Card = ({ book,flag,onRemove}) => {
    const handleClick=() =>{
        const books=JSON.parse(localStorage.getItem('books')) || [];
        const bookExists = books.some((storedBook) => storedBook.title === book.title);
        if (!bookExists) {
            const updatedBooks = [...books, book];
            localStorage.setItem('books', JSON.stringify(updatedBooks));
        }else{
            alert('Book already exists in BookShelf');
        }
    }
    const handleRemove=()=>{
        const books=JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.filter((storedBook) => storedBook.title !== book.title);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        if (onRemove) {
            onRemove(book.title);
        }
    }
    return (
        
            <div className="w-96 h-48 relative block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className=' flex flex-col gap-2'>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><span className='text-gray-600'>Title:</span>{book.title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Edition Count:{book.edition_count}</p>
                <div className='flex jsutify-center items-center gap-3'>
                </div>
                </div>
                {
                    !flag && (
                        <button type="button" 
                        className="
                        absolute bottom-0
                        text-white bg-blue-700 hover:bg-blue-800
                         focus:ring-4 focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 
                         py-2.5 me-2 mb-2 dark:bg-blue-600
                          dark:hover:bg-blue-700 focus:outline-none
                           dark:focus:ring-blue-800
                           "
                           onClick={handleClick}
                            >Add to Bookshelf</button>
                    )
                }
                {
                    flag && (
                        <button type="button" 
                        onClick={handleRemove}
                        className="
                        absolute bottom-0
                        focus:outline-none text-white bg-red-700
                         hover:bg-red-800 focus:ring-4
                          focus:ring-red-300 font-medium 
                          rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                           dark:bg-red-600 dark:hover:bg-red-700
                            dark:focus:ring-red-900">Remove</button>
                    )
                }
            </div>
      
    )
}

export default Card
