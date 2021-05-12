import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddBook from '../components/AddBook'
import BookCover from '../components/BookCover'
import Carousel from '../components/Carousel'
import Carousel2 from '../components/Carousel'
import { DataContext } from '../context/DataContext'
import { getCollection } from '../kit/api/Book'
import './BookCollection.css'


export default function BookCollection() {
    const { setCollection } = useContext(DataContext)
    useEffect(() => {
        fetchData()   
        
    }, [])

    const fetchData = async () => {
  
        await getCollection()
        .then(res => res.json())
        .then(result => setCollection(result))

    }

    return (
        <div id='collection-page'>
            <Link className='nav' to='/collection'>
                Check out the full collection!
            </Link>
            <h1 className='latest-title'>Books read recently</h1>
            <Carousel />
         
        </div>
    )
}
