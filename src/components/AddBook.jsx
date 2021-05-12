import React, { useContext } from 'react'
import { getCollection, addBook } from '../kit/api/Book'
import { DataContext } from '../context/DataContext'

export default function AddBook() {
    const { setCollection } = useContext(DataContext)
    var genres = []
    var rating = null

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

    }

    return (
        <div className='edit-info'>

            <label >Title</label>
            <input className='edit-detail' id='title' type='text' maxLength='15' />
            <label >Author</label>
            <input className='edit-detail' id='author' type='text' maxLength='15' />
            <label >Publisher</label>
            <input className='edit-detail' id='publisher' type='text' maxLength='15' />
            <label>Genre</label>
            <input className='edit-detail' type="text" id='genre' />
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


            <button onClick={post} className='accept-btn modal-btn'>Add book</button>

        </div>
    )
}
