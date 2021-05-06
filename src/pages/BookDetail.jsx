import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getBook, deleteBook } from '../kit/api/Book'
import './BookDetail.css'
import Redo from '../images/redo.svg'
import Modal from '../components/Modal'

export default function BookDetail(props) {
    const bookID = props.match.params.id
    const [currentBook, setCurrentBook] = useState(null)
    const history = useHistory()
    

    const fetchBook = async () => {

        await getBook(bookID)
            .then(res => res.json())
            .then(data => setCurrentBook(data))

    }
    const removeBook = async () => {

        await deleteBook(bookID)
            .then(history.push('/collection'))
    }
    const showModal = () => {
        var modal = document.getElementById('simpleModal');
        modal.style.display = 'flex';
    }
  

  
    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <div className='page-container'>
            <div className='details-container'>
            <img className='detail-image' src={currentBook.image} alt="URL has changed!" />
                <p className='detail'>
                    Title: {currentBook.title}
                </p>
                <p className='detail'>
                    Author: {currentBook.author}
                </p>
                <p className='detail'>
                    Publisher: {currentBook.publisher}
                </p>
                <p className='detail'>
                    Series: {currentBook.series}
                </p>
                <p className='detail'>
                    Personal Rating: {currentBook.personalRating}
                </p>
                <p className='detail'>
                    Guests rating: {(currentBook.guestsRating / (currentBook.guestsRating === 0 ? 1 : currentBook.guestsRating)).toFixed(2)}
                </p>

            </div>
            <button onClick={showModal}> Update details</button>
            <button onClick={removeBook}>Delete Book</button>
            <Modal data={currentBook} />
        </div>
    )
}
