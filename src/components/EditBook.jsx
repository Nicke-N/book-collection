import React, { useContext, useEffect } from 'react'
import { editBook, getBook } from '../kit/api/Book'
import { DataContext } from '../context/DataContext'
import './EditBook.css'
import { addOptions, closeModal } from '../kit/Functions'

export default function EditBook(props) {

    var rating = null
    const { currentBook, authorized, setCurrentBook } = useContext(DataContext)
    const bookID = currentBook._id
    var genres = [] 

    const addInfo = () => {

        const title = document.getElementById('title')
        if (title) {
            clearInfo()
            document.getElementById('author').value = currentBook.author
            document.getElementById('series').value = currentBook.series
            document.getElementById('publisher').value = currentBook.publisher
            document.getElementById('image').value = currentBook.image
            document.getElementById('year').value = currentBook.yearRead
            document.getElementById('month').value = currentBook.monthRead

            title.value = currentBook.title
            document.getElementById('author').value = currentBook.author
            document.getElementById('series').value = currentBook.series
            document.getElementById('publisher').value = currentBook.publisher
            document.getElementById('image').value = currentBook.image
            document.getElementById('year').value = currentBook.yearRead
            document.getElementById('month').value = currentBook.monthRead
            var genresContainer = document.getElementById('genre-container')

            if(currentBook.genre) {
                (currentBook.genre).map((element) => {
                    var span = document.createElement('span')
                    span.classList.add('detail-genre')
                    span.textContent = `${element}`
                    genres.push(element)
                    span.addEventListener('click', removeOnClick)
                    genresContainer.appendChild(span)
                })
            }
            
        }
    }
    const clearInfo = () => {
        document.getElementById('genre-container').textContent = ''
        document.getElementById('author').value = ''
        document.getElementById('series').value = ''
        document.getElementById('publisher').value = ''
        document.getElementById('image').value =''
        document.getElementById('year').value = ''
        document.getElementById('month').value = ''
    }
    const updateBook = async () => {
        var book = {}
        if (authorized) {
            const title = document.getElementById('title').value
            const author = document.getElementById('author').value
            const image = document.getElementById('image').value
            const series = document.getElementById('series').value
            const publisher = document.getElementById('publisher').value
            const month = document.getElementById('month').value
            const year = document.getElementById('year').value
            const genreContainer = document.getElementById('genre-container').children
            genres = []

            if (genreContainer.length > 0) {
                for (let i = 0; i < genreContainer.length; i++) {
                    genres.push(genreContainer[i].textContent)
                }
            }
        
            if (title.length > 0) book.title = title
            if (author.length > 0) book.author = author
            if (image.length > 0) book.image = image
            if (series.length > 0) book.series = series
            if (publisher.length > 0) book.publisher = publisher
            book.genre = genres
            book.monthRead = month
            book.yearRead = year
            book.personalRating = rating ? rating : 0
        } else {
           
            var http = require('http');

            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
              resp.on('data', function(ip) {
               book.guestID = `ip: ${ip}`
              });
            });
            book.rating = rating ? rating : 0
        }
        

        console.log(rating)
        console.log(book)
        
        await editBook(bookID, book)

        await getBook(bookID)
            .then(res => res.json())
            .then(data => setCurrentBook(data))
            // .then(addEventListeners())
            .then(closeModal())
    }
    const addEventListeners = () => {
        for (let element = 0; element < HTMLcollection.length; element++) {

            HTMLcollection[element].addEventListener('mouseover', ratingHover)
            HTMLcollection[element].addEventListener('click', ratingClick)
            HTMLcollection[element].addEventListener('mouseleave', ratingUnFocus)

        }

        const redoImage = document.getElementById('redo-image')
        if (redoImage) {
            const con =  document.getElementById('ratingContainer')
            con.removeChild(redoImage)
         
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
            
 
            const span = document.createElement('img')

            span.src = 'https://image.flaticon.com/icons/png/512/44/44650.png'
            span.classList.add('redo-icon')
            span.setAttribute('id', 'redo-image')
            span.addEventListener('click', addEventListeners)
            document.getElementById('ratingContainer').appendChild(span)
        }
        rating = index + 1  
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
    const removeOnClick = (e) => {
        e.preventDefault()
        
        e.target.parentNode.removeChild(e.target)
        const index = genres.indexOf(e.target.value)
        genres.splice(index, 1)
    }
    const addToArray = (e) => {
       
        if (e.code === 'Enter') {
            var genre = document.getElementById('genre')
            const genresContainer = document.getElementById('genre-container')
            if (genre) {
                if (genre.value !== '') {
                    genres.push(genre.value)
                    genre.value = ''
                    
                    if (genresContainer) {
                        genresContainer.textContent = ''
                        genres.map((element)=> {
                            var span = document.createElement('span')
                            span.classList.add('detail-genre')
                            span.textContent = `${element}`
                            span.addEventListener('click', removeOnClick)
                            genresContainer.appendChild(span)
                        })
                    }
                    
                }
            }
        }
            
        
    }
    const initialSetUp = () => {
        
        addOptions()
        addInfo()
        const genreInput = document.getElementById('genre')
        if(genreInput)
        genreInput.addEventListener('keydown', addToArray)
    }
    const HTMLcollection = document.getElementsByClassName('icon')
    if (HTMLcollection) {
        setTimeout(() => {
            addEventListeners()
        }, 1000);

    }

    useEffect(() => {
        initialSetUp()
    }, [currentBook])

    useEffect(() => {
        
    }, [currentBook])

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
                        <label>Genre</label>
                        <input className='edit-detail' type="text" id='genre'/>
                        <div id='genre-container'></div>
                        <label >Series</label>
                        <input className='edit-detail' id='series' type='text' maxLength='15' />
                        <label >Year read</label>
                        <select className='edit-detail' name="year" id="year">
                        </select>
                        <label >Month read</label>
                        <select className='edit-detail' name="month" id="month">
                        </select>
                        <label >Image URL</label>
                        <input className='edit-detail' id='image' type='text' maxLength='150' />
                        <div id='ratingContainer'>
                            
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
