import React, { useEffect, useContext } from 'react'
import { getBook } from '../kit/api/Book'
import './BookDetail.css'
import { DataContext } from '../context/DataContext'
import { authenticated, showModal } from '../kit/Functions'
import ButtonEdit from '../components/ButtonEdit'
import ButtonRemove from '../components/ButtonRemove'
import { useParams } from 'react-router-dom'

export default function BookDetail(props) {
    const { id } = useParams()
    const bookID = id

    const { authorized, setAuthorized, currentBook, setCurrentBook, setModalData, modalData } = useContext(DataContext)
    var guestRating = 0, voters, average
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    if (currentBook) {

        (currentBook.guestsRating).map(element => guestRating += element.rating)
        voters = currentBook.guestsRating.length
        average = (guestRating / (voters === 0 ? 1 : voters)).toFixed(2)

    }

    const fetchBook = async () => {

        if (authenticated()) setAuthorized(true)
        await getBook(bookID)
            .then(res => res.json())
            .then(data => {
                setCurrentBook(data)
                setModalData(data)
            })

    }

    const addRatings = () => {

        const personalRatings = document.getElementsByClassName('personal-detail-icon')

        if (personalRatings && currentBook) {
            for (let check = 0; check < 5; check++) {
                personalRatings[check].classList.remove('checked')
            }
            for (let check = 0; check < currentBook.personalRating; check++) {
                personalRatings[check].classList.add('checked')
            }
        }
        const guestsRatings = document.getElementsByClassName('guests-detail-icon')

        if (guestsRatings && currentBook) {

            const val = Math.floor(average)

            for (let check = 0; check < 5; check++) {

                const classList = Array.from(guestsRatings[check].classList)

                if (classList.includes('checked')) guestsRatings[check].classList.remove('checked')

            }

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
        addRatings()
    }, [])

    useEffect(() => {
        if (!modalData)
            setModalData(currentBook)
    }, [modalData])


    return (
        <div className='page-container'>
            {currentBook &&
                (
                    <div className='book-details-container'>
                        <img className='detail-image' src={currentBook.image} alt="URL has changed!" />

                        <div className='detail title'>
                            Title: {currentBook.title}
                       </div>

                        <div className='detail author'>
                            Author: {currentBook.author}
                       </div>
                        <div className='detail publisher'>
                            Publisher: {currentBook.publisher}
                       </div>
                        <div className='detail series'>
                            Series: {currentBook.series}
                       </div>
                        <div className='detail personalRating'>
                            Personal Rating:
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                            <span className='fa fa-star personal-detail-icon'></span>
                       </div>
                        <div className='detail guestsRating'>
                            Guests rating:
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            <span className='fa fa-star guests-detail-icon'></span>
                            {`(${average})`}
                       </div>
                        <div className='detail genre'>
                            Genre: {currentBook.genre.map(element => ` ${element}`)}
                       </div>
                        <div className='detail guests'>
                            {voters} votes
                       </div>
                        <div className='detail read'>
                            Read: {months[currentBook.monthRead - 1]} {currentBook.yearRead}
                       </div>
                        {authorized ?

                            <div className='buttonContainer'>
                                <ButtonEdit />
                                <ButtonRemove type='book' />
                            </div>

                            :

                            <div className='buttonContainer'>
                                <button className='accept-btn guest-rate-btn' onClick={showModal}>
                                    Rate it!
                                    </button>
                            </div>

                        }

                    </div>
                )
            }



        </div>
    )
}
