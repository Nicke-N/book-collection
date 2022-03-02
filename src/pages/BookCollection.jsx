import React, { useEffect, useContext } from 'react'
import { DataContext } from '../context/DataContext'
import BookCover from '../components/BookCover'
import { getCollection } from '../kit/api/Book'
import './BookCollection.css'
import { authenticated } from '../kit/Functions.js'

export default function BookList() {

    const { collection, setCollection, searchVal, setSearchVal, filterOption, setFilterOption, authorized , setAuthorized, currentBook, type } = useContext(DataContext)

    var added

    useEffect(() => {
        if (!collection || Object.keys(collection).length === 0) {
            fetchData()
        }
        if (authenticated()) setAuthorized(true)
        setPreviousValues()
        addEventListeners()
    }, [filterOption, searchVal])
    useEffect(() => {
        
    }, [])
    useEffect(() => {
        fetchData()
    }, [currentBook])

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

    return (
        <div id='list-container'>
            <div className='top-container'>
                <div id='filterOptions'>
                    <select name="filter" id="filter">
                        <option className='option' value="genre">Genre</option>
                        <option className='option' value="author">Author</option>
                        <option className='option' value="title">Title</option>
                        <option className='option' value="publisher">Publisher</option>
                    </select>
                </div>
                <div id='search-field'>
                    <input id='search' type="text" maxLength='50' onChange={searchHandler} />
                </div>     
            </div>

            <div className='section-divider'></div>

            <div id='book-list'>
                {searchVal && filterOption !== 'genre' ? 
                    
                    Object.entries(collection).map((element) => ((element[1][filterOption]).toLowerCase()).includes(searchVal) ?  <BookCover  key={element[0]} data={element[1]} /> : null)

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
        
        </div>

    )
}
