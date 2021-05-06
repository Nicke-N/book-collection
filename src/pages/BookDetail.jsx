import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getBook, deleteBook, editBook } from '../kit/api/Book'
import './BookDetail.css'
import Redo from '../images/redo.svg'

export default function BookDetail(props) {
    const bookID = props.match.params.id
    const [currentBook, setCurrentBook] = useState(null)
    const history = useHistory()
    var rating = null

    const fetchBook = async () => {

        await getBook(bookID)
            .then(res => res.json())
            .then(data => {
                setCurrentBook(data)

                document.getElementById('title').value = data.title
                document.getElementById('author').value = data.author
                document.getElementById('series').value = data.series
                document.getElementById('publisher').value = data.publisher
                document.getElementById('image').value = data.image
            })

    }
    const removeBook = async () => {

        await deleteBook(bookID)
            .then(history.push('/collection'))
    }
    const updateBook = async () => {
        const title = document.getElementById('title').value
        const author = document.getElementById('author').value
        const image = document.getElementById('image').value
        const series = document.getElementById('series').value
        const publisher = document.getElementById('publisher').value

        var book = {}
        if (title.length > 0) book.title = title
        if (author.length > 0) book.author = author
        if (image.length > 0) book.image = image
        if (series.length > 0) book.series = series
        if (publisher.length > 0) book.publisher = publisher
        if (rating) book.personalRating = rating

        await editBook(bookID, book)
            .then(history.push('/collection'))
    }
    const addEventListeners = () => {
        for (let element = 0; element < HTMLcollection.length; element++) {

            HTMLcollection[element].addEventListener('mouseover', ratingHover)
            HTMLcollection[element].addEventListener('click', ratingClick)

        }
        const redoImage = document.getElementById('redo-image')
        if (redoImage) {

            document.getElementById('ratingContainer').removeChild(redoImage)
            rating = null
        }
    }
    const ratingHover = (event) => {

        if (event.path[1].children.length > 0 ) {

            const children = event.path[1].children
            const index = Array.from(children).indexOf(event.currentTarget)
            const currentClassList = Array.from(children[index].classList)
            if (currentClassList.length > 2) {

                for (let i = 1; i <= 5; i++) {

                    const classList = Array.from(event.path[1].children[i].classList)
 
                    if (i <= index) {
                        event.path[1].children[i].classList.add('checked')
                    } else {
                        if (classList.includes('checked'))
                        event.path[1].children[i].classList.remove('checked')
                    }
                    
                }

            } else {
                for (let i = 1; i <= 5; i++) {

                    const classList = Array.from(event.path[1].children[i].classList)
    
                    if (classList.includes('checked'))
                    event.path[1].children[i].classList.remove('checked')
                }
            }   
        }

    }
    const ratingClick = (event) => {
        const children = event.path[1].children
        const index = Array.from(children).indexOf(event.currentTarget)

        for (let element = 0; element < HTMLcollection.length; element++) {

            HTMLcollection[element].removeEventListener('mouseover', ratingHover)   
            HTMLcollection[element].removeEventListener('click', ratingClick)

        }

        
        const redoImage = document.getElementById('redo-image')

        if(!redoImage) {
            rating = index
            const span = document.createElement('img')
            // span.classList.add('fas')
            // span.classList.add('fa-redo')
            span.src = 'https://image.flaticon.com/icons/png/512/44/44650.png'
            span.classList.add('small-icon')
            span.setAttribute('id', 'redo-image')
            span.addEventListener('click', addEventListeners)
            document.getElementById('ratingContainer').appendChild(span)
        }
        
    }

    const HTMLcollection = document.getElementsByClassName('fa')
    if (HTMLcollection) {
        setTimeout(() => {

            addEventListeners()

        }, 1000);
        
    }

    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <div>
            {currentBook ?
                <div>
                    
                    <img src={currentBook.image} alt="URL has changed!" />
                    <input id='title' type='text' maxLength='15' />
                    <input id='author' type='text' maxLength='15' />
                    <input id='publisher' type='text' maxLength='15' />
                    <input id='series' type='text' maxLength='15' />
                    <input id='image' type='text' maxLength='150' />
                    
                    <div id='ratingContainer'>
                        <img className='fa small-icon' src='https://upload.wikimedia.org/wikipedia/commons/5/58/White_Circle.svg' />
                        <span className='fa fa-star icon'></span>
                        <span className='fa fa-star icon'></span>
                        <span className='fa fa-star icon'></span>
                        <span className='fa fa-star icon'></span>
                        <span className='fa fa-star icon'></span>
                        <span className="fas fa-redo-alt small-icon"></span>
                    </div>
                    

                    <button onClick={updateBook}>Update Book</button>
                    <button onClick={removeBook}>Delete Book</button>
                </div>
                :
                null

            }
        </div>
    )
}
