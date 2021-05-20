import React, { useContext, useEffect } from 'react'
import Carousel from '../components/Carousel'
import { DataContext } from '../context/DataContext'
import { getCollection } from '../kit/api/Book'
import './Latest.css'

export default function BookCollection(props) {
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
            <div id='top-container'>
                <div>
                    <h1 className='latest-title'>Books read recently</h1>
                </div>
            </div>
            
            <div className='section-divider' />

            <Carousel />

        </div>
    )
}
