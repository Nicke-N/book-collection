import React, { useContext } from 'react'
import { getCollection, addBook } from '../kit/api/Book'
import { DataContext } from '../context/DataContext'

export default function AddBook() {
    const { setCollection } = useContext(DataContext)

    const post = async () => {

        const title = document.getElementById('title').value
        const author = document.getElementById('author').value
        const image = document.getElementById('image').value
    
        await addBook(title, author, image)
        await getCollection()
        .then(res => res.json())
        .then(data => setCollection(data))
        
      
    }

    return (
        <div>
            <input id="title" type="text" maxLength="15" />
            <input id="author" type="text" maxLength="15" />
            <input id="image" type="text" maxLength="150" />
            <button onClick={post} id="test">Post</button>

       
        </div>
    )
}
