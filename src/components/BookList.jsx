import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import BookCover from './BookCover'
import { getCollection } from '../kit/api/Book'
import './BookList.css'
import { showModal, authenticated } from '../kit/Functions.js'
import Modal from './Modal'
import BirchPlank from './BirchPlank'

export default function BookList() {

    const { collection, setCollection, searchVal, setSearchVal, filterOption, setFilterOption, authorized , setAuthorized} = useContext(DataContext)

    var added
    useEffect(() => {
        if (!collection || Object.keys(collection).length === 0) {
            fetchData()
        }
        if (authenticated()) setAuthorized(true)
        setPreviousValues()
        addEventListeners()
    }, [filterOption, searchVal])

    const fetchData = async () => {

        await getCollection()
            .then(res => res.json())
            .then(result => setCollection(result))

    }
    const searchHandler = (e) => {
        var val = e.target.value
        val = val.toLowerCase()
        setSearchVal(val)
        setOptionValue()
    }
    const setPreviousValues = () => {
        if (filterOption) document.getElementById('filter').value = filterOption
        if (searchVal) document.getElementById('search').value = searchVal
    }
    const addEventListeners = () => {
        document.getElementById('filter').removeEventListener('mouseleave', setOptionValue)
        document.getElementById('filter').addEventListener('mouseleave', setOptionValue)
    }
    const setOptionValue = () => setFilterOption(document.getElementById('filter').value)
    const returnToTop = () => window.scroll(0, 0)

    return (
        <div>
            <div className='top-container'>
                <div id='filterOptions'>
                    <select name="filter" id="filter">
                        <option className='option' value="author">Author</option>
                        <option className='option' value="title">Title</option>
                        <option className='option' value="publisher">Publisher</option>
                        <option className='option' value="genre">Genre</option>
                    </select>
                </div>
                <div id='search-field'>
                    <input id='search' type="text" maxLength='50' onChange={searchHandler} />
                </div>     
                <Link id='nav' to='/latest'>
                    <button className='nav-btn'>Check my latest reads</button>
                </Link>
            </div>
            <div className='section-divider'></div>

            <div id='book-list'>
                {searchVal && filterOption !== 'genre' ? 
                    
                    Object.entries(collection).map((element, index) => ((element[1][filterOption]).toLowerCase()).includes(searchVal) ? (index + 1 ) % 4 === 0 ? <> <BirchPlank /> <BookCover  key={element[0]} data={element[1]} /> </>: <BookCover  key={element[0]} data={element[1]} /> : null)

                    : searchVal && filterOption === 'genre' ?

                    Object.entries(collection).map((element, index) => {
                        added = false
                        
                        return (element[1]['genre']).map((elem) => {
                           
                            if (elem.toLowerCase().includes(searchVal) && !added) {
                                added = true
                                return <BookCover key={element[0]} data={element[1]} />
                            }
                         
                        })
                    })
                    : collection && Object.entries(collection).map((element) => <BookCover key={element[0]} data={element[1]} />)

                }
            </div>
            <button className='nav-btn list-nav'onClick={returnToTop}>Return to top</button>
            { authorized ? 
                <>
                    <button className='accept-btn list-btn'onClick={showModal}>Add book</button>
                    <Modal type='addNewBook' />
                </>
                : 
                null
            }
            
        </div>

    )
}
