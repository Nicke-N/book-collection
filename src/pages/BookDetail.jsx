import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getBook, deleteBook, editBook } from '../kit/api/Book'

export default function BookDetail(props) {
    const bookID = props.match.params.id
    const [ currentBook, setCurrentBook ] = useState(null)
    const history = useHistory()

    const fetchBook = async () => {
        
        await getBook(bookID)
        .then(res => res.json())
        .then(data => {
            setCurrentBook(data)
            
            document.getElementById('title').value = data.title
            document.getElementById('author').value = data.author
            document.getElementById('image').value = data.image
        })
       
    }

    const removeBook = async () => {

        await deleteBook(bookID)
        .then(history.push('/collection'))
    }
    const updateBook = async () => {
        const title =  document.getElementById('title').value 
        const author =  document.getElementById('author').value 
        const image =  document.getElementById('image').value 

        const book = {title, author, image}
        await editBook(bookID, book)
        .then(history.push('/collection'))
    }

    useEffect(() => {
        fetchBook()
        
    }, [])



    return (
        <div>
            {currentBook ? 
                <>
                    <img src={currentBook.image} />
                    <input id="title" type="text" maxLength="15" />
                    <input id="author" type="text" maxLength="15" />
                    <input id="image" type="text" maxLength="150" />
                    
                    <button onClick={updateBook}>Update Book</button>
                    <button onClick={removeBook}>Delete Book</button>
                </>
                :
                null
        
            }
        </div>
    )
}
