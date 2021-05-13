import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import BookCover from './BookCover'
import { getCollection } from '../kit/api/Book'
import './BookList.css'
import SectionDividerTop from './SectionDividerTop'

export default function BookList() {

    const { collection, setCollection, searchVal, setSearchVal, filterOption, setFilterOption } = useContext(DataContext)

    var added
    useEffect(() => {
        if (!collection || Object.keys(collection).length === 0) {
            fetchData()
        }
        setPreviousValues()
        addEventListeners()
    }, [filterOption, searchVal])

    const fetchData = async () => {

        await getCollection()
            .then(res => res.json())
            .then(result => setCollection(result))

    }
    const searchHandler = (e) => {
        setSearchVal(e.target.value)
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
                    Check my latest reads!
                </Link>
            </div>
            <SectionDividerTop />
            <div id='book-list'>
                {searchVal && filterOption !== 'genre' ? 

                    Object.entries(collection).map((element) => element[1][filterOption].includes(searchVal) ? <BookCover  key={element[0]} data={element[1]} /> : null)

                    : searchVal && filterOption === 'genre' ?

                    Object.entries(collection).map((element) => {
                        added = false
                        return (element[1]['genre']).map((elem) => {
                           
                            if (elem.includes(searchVal) && !added) {
                                added = true
                                return <BookCover key={element[0]} data={element[1]} />
                            }
                         
                        })
                    })
                    : collection && Object.entries(collection).map((element) => <BookCover  key={element[0]} data={element[1]} />)

                }
            </div>
        </div>

    )
}
