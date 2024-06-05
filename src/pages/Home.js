import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Home = () => {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedInputText = useDebounce(inputText, 500);

    const getResults = async () => {
        setLoading(true);
        try {
            const results = await axios.get(`https://openlibrary.org/search.json?q=${debouncedInputText}&limit=10&page=1`);
            setResult(results.data.docs);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (debouncedInputText) {
            getResults();
        } else {
            setResult([]);
        }
    }, [debouncedInputText]);

    const handleChange = (e) => {
        setInputText(e.target.value);
    }

    return (
        <div className="m-4 w-full h-full">
            <form className='w-full px-8 flex justify-between items-center'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <label htmlFor="search flex-1">
                        <p className='text-xl font-medium'>Search Your Book</p>
                    </label>
                    <input
                        id="search"
                        type='text'
                        className='border-2 h-16 rounded-3xl w-64 outline-none px-5'
                        onChange={handleChange}
                        value={inputText}
                    />
                </div>
                <button type="button"
                    className="
                    text-white bg-blue-700 hover:bg-blue-800
                    focus:ring-4 focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 
                    py-2.5 me-2 mb-2 dark:bg-blue-600
                    dark:hover:bg-blue-700 focus:outline-none
                    dark:focus:ring-blue-800
                    ">
                    <Link to="/books">Bookshelf</Link>
                </button>
            </form>
            <div className='flex flex-wrap gap-8 h-full w-full p-8'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    result && result.map((book) => (
                        <Card key={book.title} book={book} flag={false} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
