import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import { DataContext } from '../context/DataContext'
import { getCollection } from '../kit/api/Book'
import './BookCollection.css'
import LeftArrow from '../images/left-arrow.png'
import Modal from '../components/Modal'

export default function BookCollection() {
    const { setCollection, type } = useContext(DataContext)
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
                <div id='nav-container'>
                <Link className='nav' to='/collection'>
                    Check out the full collection!
                </Link>
                </div>
                
            </div>
            
            <div className='section-divider' />

            <Carousel />
            <img src={LeftArrow} alt="" />
            <Modal type={type} />
        </div>
    )
}
