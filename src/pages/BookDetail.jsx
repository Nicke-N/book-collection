import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { getBook, deleteBook } from '../kit/api/Book'
import './BookDetail.css'
import Modal from '../components/Modal'
import { DataContext } from '../context/DataContext'
import { authenticated, showModal } from '../kit/Functions'

export default function BookDetail(props) {
    const bookID = props.match.params.id
    const history = useHistory()
    const { authorized, setAuthorized, currentBook, setCurrentBook } = useContext(DataContext)

    const fetchBook = async () => {
        if (authenticated()) setAuthorized(true)
        await getBook(bookID)
            .then(res => res.json())
            .then(data => setCurrentBook(data))

    }
    const removeBook = async () => {

        await deleteBook(bookID)
            .then(history.push('/collection'))
    }
    

    useEffect(() => {
        fetchBook()
    }, [])
    return (
        <div className='page-container'>
            {currentBook &&
                (
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
                    Guests rating: {(currentBook.guestsRating / (currentBook.guests === 0 ? 1 : currentBook.guests) ).toFixed(2)}
                </p>
                <Modal data={currentBook} />
            </div>
                )
            }
            
            {authorized ? 
                (
                    <>
                        <button onClick={showModal}> Update details</button>
                        <button onClick={removeBook}>Delete Book</button>
                    </>
                ) 
                : 
                (
                    <>
                        <button onClick={showModal}>
                            Rate it!
                        </button>
                    </>
                )
            }
           
          
        </div>
    )
}
