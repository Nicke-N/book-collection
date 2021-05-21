import React, { useContext, useEffect } from 'react'
import { getCollection, addBook } from '../kit/api/Book'
import { DataContext } from '../context/DataContext'
import { addOptions, closeModal, clearInfo } from '../kit/Functions'

export default function AddBook() {
    const { setCollection } = useContext(DataContext)
    var genres = []
    var rating = null
    const HTMLcollection = document.getElementsByClassName('icon')
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

        var children, index
  
            children = event.target.parentElement.children
        

        index = Array.from(children).indexOf(event.currentTarget)
        const currentClassList = Array.from(children[index].classList)
        if (currentClassList.length > 2) {
            for (let i = 0; i < 5; i++) {
                var classList = Array.from(event.target.parentElement.children[i].classList)
                
                    if (i <= index && event.target.parentElement.children) {
                
                    event.target.parentElement.children[i].classList.add('checked')
                } else {
                   
                    if (classList.includes('checked')) event.target.parentElement.children[i].classList.remove('checked')
                                       
                }
            }
        }
        

    }
    const ratingClick = (event) => {
        var children, index
        if (event.target.parentElement.children){
            children = event.target.parentElement.children
        }
        index = Array.from(children).indexOf(event.currentTarget)
        for (let element = 0; element < HTMLcollection.length; element++) {
    
            HTMLcollection[element].removeEventListener('mouseover', ratingHover)
            HTMLcollection[element].removeEventListener('mouseleave', ratingUnFocus)
            HTMLcollection[element].removeEventListener('click', ratingClick)

        }

        rating = index + 1  

        const redoImage = document.getElementById('redo-image')

        if (!redoImage) {
            
            const span = document.createElement('img')

            span.src = 'https://image.flaticon.com/icons/png/512/44/44650.png'
            span.classList.add('redo-icon')
            span.setAttribute('id', 'redo-image')
            span.addEventListener('click', addEventListeners)
            document.getElementById('ratingContainer').appendChild(span)
        }
       
    }
    const ratingUnFocus = (event) => {

 
            if (event.target.parentElement.children.length > 0) {

                for (let i = 0; i < 5; i++) {
    
                    const classList = Array.from(event.target.parentElement.children[i].classList)
    
                    if (classList.includes('checked'))
                    event.target.parentElement.children[i].classList.remove('checked')
                }
            }
        
       
    }
    const post = async () => {
        var book = {}
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

        if (rating) {
            book.personalRating = rating
        } else {
            book.personalRating = 0
        }

        await addBook(book)
        await getCollection()
            .then(res => res.json())
            .then(data => setCollection(data))
            .then(closeModal())
            .then(() => {
                clearInfo()
                genres = []
            })

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
                        console.log(genres)
                        genres.map((element) => {
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
    const removeOnClick = (e) => {
        e.preventDefault()

        e.target.parentNode.removeChild(e.target)
        const index = genres.indexOf(e.target.value)
        genres.splice(index, 1)
    }

    useEffect(() => {

        addOptions()
        const genreInput = document.getElementById('genre')
        if (genreInput) genreInput.addEventListener('keydown', addToArray)
        if (HTMLcollection) {
            setTimeout(() => {
                addEventListeners()
            }, 1000); 
        }
    }, [])
    
    
    return (
        <div id='edit-container'>
            <div className='edit-info'>

                <label className='book-label'>Title</label>
                <input className='book-input edit-detail' id='title' type='text' maxLength='15' />
                <label className='book-label'>Author</label>
                <input className='book-input edit-detail' id='author' type='text' maxLength='15' />
                <label className='book-label'>Publisher</label>
                <input className='book-input edit-detail' id='publisher' type='text' maxLength='15' />
                <label className='book-label'>Genre</label>
                <input className='book-input edit-detail' type="text" id='genre' />
                <div id='genre-container'></div>
                <label className='book-label'>Series</label>
                <input className='book-input edit-detail' id='series' type='text' maxLength='15' />
                <label className='book-label'>Year read</label>
                <select className='book-select edit-detail' name="year" id="year">
                </select>
                <label className='book-label'>Month read</label>
                <select className='book-select edit-detail' name="month" id="month">
                </select>
                <label className='book-label'>Image URL</label>
                <input className='book-input edit-detail' id='image' type='text' maxLength='300' />
                <div id='ratingContainer'>

                    <span className='fa fa-star icon'></span>
                    <span className='fa fa-star icon'></span>
                    <span className='fa fa-star icon'></span>
                    <span className='fa fa-star icon'></span>
                    <span className='fa fa-star icon'></span>

                </div>


                <button onClick={post} className='accept-btn modal-btn'>Add book</button>

            </div>
        </div>


    )
}
