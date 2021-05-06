import React, { useContext, useEffect } from 'react'
import AddBook from '../components/AddBook'
import BookCover from '../components/BookCover'
import { DataContext } from '../context/DataContext'
import { getCollection } from '../kit/api/Book'


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
        <div>
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
