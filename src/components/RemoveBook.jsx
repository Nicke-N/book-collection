import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { closeModal , goBack} from '../kit/Functions'
import { deleteBook } from '../kit/api/Book'
import './Remove.css'

export default function RemoveBook() {

    const {setRemove, currentBook } = useContext(DataContext)

    const removeBook = async () => {

        await deleteBook(currentBook._id)
            .then(setRemove(false))
            .then(closeModal())
            .then(goBack())
    }

    const returnToProfile = () => {
        setRemove(false)
        closeModal()
    }

    return (
        <div className='remove-container'>
            <p className='remove-text'>Are you sure you want to delete book <b>{currentBook.title} by {currentBook.author} ?</b> </p>
            <div className='remove-btn-container'>
                <button className='accept-btn' onClick={removeBook}>Yes</button>
                <button className='reject-btn' onClick={returnToProfile}>No</button>
            </div>
                
        </div>
    )
}
