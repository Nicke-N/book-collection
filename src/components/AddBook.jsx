import React, { useContext } from 'react'
import { getCollection, addBook } from '../kit/api/Book'
import { DataContext } from '../context/DataContext'

export default function AddBook() {
    const { setCollection } = useContext(DataContext)

    const post = async () => {

        const title = document.getElementById('title').value
        const author = document.getElementById('author').value
        const image = document.getElementById('image').value
        const series = document.getElementById('series').value
        const publisher = document.getElementById('publisher').value

        var book = {}
        if (title.length > 0) book.title = title
        if (author.length > 0) book.author= author
        if (image.length > 0) book.image = image
        if (series.length > 0) book.series = series
        if (publisher.length > 0)  book.publisher = publisher
    
        await addBook(book)
        await getCollection()
        .then(res => res.json())
        .then(data => setCollection(data))
        
    }

    return (
        <div>
             
            Title: <input id="title" type="text" maxLength="15" />
            Author: <input id="author" type="text" maxLength="15" />
            Publisher: <input id="publisher" type="text" maxLength="15" />
            series: <input id="series" type="text" maxLength="15" />
            Image URL: <input id="image" type="text" maxLength="150" />
            <button onClick={post} id="test">Post</button>

       
        </div>
    )
}
