import React, { useContext, useEffect } from 'react'
import AddBook from '../components/AddBook'
import BookCover from '../components/BookCover'
import Carousel from '../components/Carousel'
import Carousel2 from '../components/Carousel2'
import { DataContext } from '../context/DataContext'
import { getCollection } from '../kit/api/Book'
import './BookCollection.css'


export default function BookCollection() {
    const { collection, setCollection } = useContext(DataContext)
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
            <Carousel2 />
             <AddBook />
            {collection && Object.entries(collection).map((element) => {
            return <div key={element[1]._id}> 

             <BookCover data={element[1]} />   

              
            </div>
          })
          }
         
        </div>
    )
}
