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
    var guestRating

    if (currentBook) guestRating = (currentBook.guestsRating / (currentBook.guests === 0 ? 1 : currentBook.guests)).toFixed(2)

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
    const addRatings = () => {

        const personalRatings = document.getElementsByClassName('personal-detail-icon')
        if (personalRatings && currentBook) {
            for (let check = 0; check < currentBook.personalRating; check++) {
                personalRatings[check].classList.add('checked')
            }
        }
        const guestsRatings = document.getElementsByClassName('guests-detail-icon')
        if (guestsRatings && currentBook) {
            
            const val = Math.floor(guestRating)

            for (let check = 0; check < val; check++) {
       
                guestsRatings[check].classList.add('checked')
            }
        }
    }
    useEffect(() => {
        addRatings()
    }, [currentBook])

    useEffect(() => {
        fetchBook()
    }, [])
    return (
        <div className='page-container'>
            {currentBook &&
                (
                    <div id='details-container'>
                        <img className='detail-image' src={currentBook.image} alt="URL has changed!" />
                        <p className='detail title'>
                            Title: {currentBook.title}
                        </p>
                        <p className='detail author'>
                            Author: {currentBook.author}
                        </p>
                        <p className='detail publisher'>
                            Publisher: {currentBook.publisher}
                        </p>
                        <p className='detail series'>
                            Series: {currentBook.series}
                        </p>
                        <p className='detail personalRating'>
                            Personal Rating:
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                        </p>
                        <p className='detail guestsRating'>
                            Guests rating:
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            {`(${guestRating})`}
                        </p>

                        {authorized ?
                            (
                                <div className='buttonContainer'>
                                    <button className='accept-btn' onClick={showModal}> Update details</button>
                                    <button className='reject-btn' onClick={removeBook}>Delete Book</button>
                                </div>
                            )
                            :
                            (
                                <div className='buttonContainer'>
                                    <button onClick={showModal}>
                                        Rate it!
                        </button>
                                </div>
                            )
                        }
                        <div className='navBack'>
                            <a href="/collection"><img className='small-icon' src="https://img.flaticon.com/icons/png/512/60/60577.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" alt="" /></a>
                        </div>
                        <Modal data={currentBook} />
                    </div>
                )
            }



        </div>
    )
}
