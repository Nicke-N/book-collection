import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import BookCover from './BookCover'
import { getCollection } from '../kit/api/Book'
import './BookList.css'

export default function BookList() {

    const { collection, setCollection } = useContext(DataContext)

    useEffect(() => {
        if (!collection) {
            fetchData()
        }
    }, [])

    const fetchData = async () => {

        await getCollection()
            .then(res => res.json())
            .then(result => setCollection(result))

    }

    return (
        <div>
            <div className='top-container'>
                <h1 title='latest-title'>All books</h1>
                <div></div>
                <Link id='nav' to='/latest'>
                    Check my latest reads!
                </Link>
            </div>
           
            <div id='book-list'>
                {collection && Object.entries(collection).map((element) => {
                    return <BookCover data={element[1]} />
                })

                }
            </div>
        </div>

    )
}
