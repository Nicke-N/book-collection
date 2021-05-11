import React, { useContext, useEffect } from 'react'
import { editBook, getBook } from '../kit/api/Book'
import { DataContext } from '../context/DataContext'
import './EditBook.css'

export default function EditBook(props) {

    var rating = null
    const { currentBook, authorized, setCurrentBook } = useContext(DataContext)
    const bookID = currentBook._id
    const addInfo = () => {

        const title = document.getElementById('title')
        if (title) {
            title.value = currentBook.title
            document.getElementById('author').value = currentBook.author
            document.getElementById('series').value = currentBook.series
            document.getElementById('publisher').value = currentBook.publisher
            document.getElementById('image').value = currentBook.image
        }
    }

    const updateBook = async () => {
        var book = {}
        if (authorized) {
            const title = document.getElementById('title').value
            const author = document.getElementById('author').value
            const image = document.getElementById('image').value
            const series = document.getElementById('series').value
            const publisher = document.getElementById('publisher').value

            if (title.length > 0) book.title = title
            if (author.length > 0) book.author = author
            if (image.length > 0) book.image = image
            if (series.length > 0) book.series = series
            if (publisher.length > 0) book.publisher = publisher

        }
        if (rating) {
            book.personalRating = rating
        } else {
            book.personalRating = 0
        }
      
        await editBook(bookID, book)

        await getBook(bookID)
            .then(res => res.json())
            .then(data => setCurrentBook(data))

        document.getElementById('simpleModal').style.display = 'none'
    }
    const addEventListeners = () => {
        for (let element = 0; element < HTMLcollection.length; element++) {

            HTMLcollection[element].addEventListener('mouseover', ratingHover)
            HTMLcollection[element].addEventListener('click', ratingClick)
            HTMLcollection[element].addEventListener('mouseleave', ratingUnFocus)

        }

        const redoImage = document.getElementById('redo-image')
        if (redoImage) {

            document.getElementById('ratingContainer').removeChild(redoImage)
            rating = null
        }
    }
    const ratingHover = (event) => {

        if (event.path[1].children.length > 0) {

            const children = event.path[1].children
            const index = Array.from(children).indexOf(event.currentTarget)
            const currentClassList = Array.from(children[index].classList)
            if (currentClassList.length > 2) {

                for (let i = 0; i < 5; i++) {

                    const classList = Array.from(event.path[1].children[i].classList)

                    if (i <= index) {
                        event.path[1].children[i].classList.add('checked')
                    } else {
                        if (classList.includes('checked'))
                            event.path[1].children[i].classList.remove('checked')
                    }

                }

            }
        }

    }
    const ratingClick = (event) => {
        const children = event.path[1].children
        const index = Array.from(children).indexOf(event.currentTarget)
        
        for (let element = 0; element < HTMLcollection.length; element++) {

            HTMLcollection[element].removeEventListener('mouseover', ratingHover)
            HTMLcollection[element].removeEventListener('mouseleave', ratingUnFocus)
            HTMLcollection[element].removeEventListener('click', ratingClick)

        }

        const redoImage = document.getElementById('redo-image')

        if (!redoImage) {
            rating = index + 1  
            
            const span = document.createElement('img')

            span.src = 'https://image.flaticon.com/icons/png/512/44/44650.png'
            span.classList.add('redo-icon')
            span.setAttribute('id', 'redo-image')
            span.addEventListener('click', addEventListeners)
            document.getElementById('ratingContainer').appendChild(span)
        }

    }
    const ratingUnFocus = (event) => {
     
        if (event.path[1].children.length > 0) {

            for (let i = 0; i < 5; i++) {

                const classList = Array.from(event.path[1].children[i].classList)

                if (classList.includes('checked'))
                    event.path[1].children[i].classList.remove('checked')
            }
        }
    }
    const HTMLcollection = document.getElementsByClassName('icon')
    if (HTMLcollection) {
        setTimeout(() => {
            addEventListeners()
        }, 1000);

    }

    useEffect(() => {
        addInfo()
    }, [])

    return (
        <div id='edit-container'>
            {props.data ?
                authorized ?
                    <div className='edit-info'>

                        <label >Title</label>
                        <input className='edit-detail' id='title' type='text' maxLength='15' />
                        <label >Author</label>
                        <input className='edit-detail' id='author' type='text' maxLength='15' />
                        <label >Publisher</label>
                        <input className='edit-detail' id='publisher' type='text' maxLength='15' />
                        <label >Series</label>
                        <input className='edit-detail' id='series' type='text' maxLength='15' />
                        <label >Image URL</label>
                        <input className='edit-detail' id='image' type='text' maxLength='150' />

                        <div id='ratingContainer'>
                            {/* <img className='fa small-icon' src='https://upload.wikimedia.org/wikipedia/commons/5/58/White_Circle.svg' /> */}
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>

                        </div>


                        <button onClick={updateBook} className='accept-btn modal-btn'>Update Book</button>

                    </div>
                    :
                    <div id='guestRatingContainer'>
                        <div id='ratingContainer'>
                            {/* <img className='fa icon' src='https://upload.wikimedia.org/wikipedia/commons/5/58/White_Circle.svg' /> */}
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>
                            <span className='fa fa-star icon'></span>
                        </div>
                        <button onClick={updateBook} className='accept-btn modal-btn'>Rate!</button>
                    </div>
                : null

            }
        </div>
    )
}
