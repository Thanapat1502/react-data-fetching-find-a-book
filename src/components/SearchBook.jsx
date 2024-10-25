import axios from "axios";
import { useEffect, useState } from "react";


export function SearchBook() {
    const [booksearch, setBookSearch] = useState([])
    const [inputBook, setInputBook] = useState("")
    const [debouncedInput, setDebouncedInput] = useState(""); // debounce
    

    const inputBookHandler = (event) => {
        setInputBook(event.target.value); 
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(inputBook);
        }, 500);

        return () => {
            clearTimeout(handler);
        }
    },[inputBook])


    useEffect(() => {
        if (debouncedInput) {
            getBookName();
        }
    }, [debouncedInput])
    
    const getBookName = async () => {
        if (!debouncedInput) return;
        try {
            const results = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${debouncedInput}`);
            console.log(results)
            setBookSearch(results.data.items)   
        } catch (error) {
            console.log(error)
        }   
    };
    
    return (
        <>
        <h1>Find a Book</h1>
        <div className="book-input-container">
        <label>
          <input
            id="book-name"
            name="book-name"
            type="text"
            placeholder="Search Book here"
            value={inputBook}
            onChange = {inputBookHandler}
          />
        </label>
        </div>
        <ul>
            {booksearch.map((book) => (
                    <li key={book.id}>{book.volumeInfo.title}</li> 
                ))}
        </ul>
        </>
    )
}