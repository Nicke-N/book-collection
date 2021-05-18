import React, { useEffect, useContext } from 'react'
import { getBook } from '../kit/api/Book'
import './BookDetail.css'
import Modal from '../components/Modal'
import { DataContext } from '../context/DataContext'
import { authenticated, showModal, goBack } from '../kit/Functions'
import ButtonEdit from '../components/ButtonEdit'
import ButtonRemove from '../components/ButtonRemove'

export default function BookDetail(props) {
    
    const bookID = props.match.params.id

    const { authorized, setAuthorized, currentBook, setCurrentBook, remove } = useContext(DataContext)
    var guestRating = 0, voters ,average
    const months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ]

    if (currentBook){
        
        (currentBook.guestsRating).map(element => guestRating += element.rating)
        voters = currentBook.guestsRating.length
        average = (guestRating / (voters === 0 ? 1 : voters)).toFixed(2)

    }

    const fetchBook = async () => {

        if (authenticated()) setAuthorized(true)
        await getBook(bookID)
            .then(res => res.json())
            .then(data => setCurrentBook(data))

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
                    
                if(classList.includes('checked')) guestsRatings[check].classList.remove('checked')
               
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

    return (
        <div className='page-container'>
            {currentBook &&
                (
                    <div className='details-container'>
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
                            {`(${average})`}
                        </p>
                        <p className='detail genre'>
                            Genre: {currentBook.genre.map(element => ` ${element}`)}
                        </p>
                        <p className='detail guests'>
                            {voters} votes
                        </p>
                        <p className='detail read'>
                            Read: {months[currentBook.monthRead - 1]} {currentBook.yearRead}
                        </p>
                        {authorized ?
                            (
                                <div className='buttonContainer'>
                                   <ButtonEdit />
                                   <ButtonRemove />
                                </div>
                            )
                            :
                            (
                                <div className='buttonContainer'>
                                    <button className='accept-btn guest-rate-btn' onClick={showModal}>
                                        Rate it!
                                    </button>
                                </div>
                            )
                        }
                        <div className='navBack'>
                            <img onClick={goBack} id='return' className='small-icon' src="https://img.flaticon.com/icons/png/512/60/60577.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" alt="" />
                        </div>
                        <Modal data={currentBook} remove={remove} />
                    </div>
                )
            }



        </div>
    )
}
