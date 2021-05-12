import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import BookCover from './BookCover'
import { getCollection } from '../kit/api/Book'
import './BookList.css'

export default function BookList() {

    const { collection, setCollection } = useContext(DataContext)
    const [ searchVal, setSearchVal ] = useState(null)
    const [ filterOption, setFilterOption ] = useState(null)
    var added
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
    const searchHandler = (e) => {
        setSearchVal(e.target.value)
        const searchOption = document.getElementById('filter').value
        setFilterOption(searchOption)
    }

    return (
        <div>
            <div className='top-container'>
                <div id='filterOptions'>
                    <label>Filter by: </label>
                    <select name="filter" id="filter">
                        <option value="author">Author</option>
                        <option value="title">Title</option>
                        <option value="publisher">Publisher</option>
                        <option value="genre">Genre</option>
                    </select>
                </div>
                <div id='search-field'>
                    <input id='search' type="text" maxLength='50' onChange={searchHandler} />
                </div>
                
                <Link id='nav' to='/latest'>
                    Check my latest reads!
                </Link>
            </div>
           
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
