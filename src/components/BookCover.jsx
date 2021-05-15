import React from 'react'
import { Link } from 'react-router-dom'
import './BookCover.css'
export default function BookCover(props) {

    return (
        props.carousel ?
            <div className="book">
            <Link to={`/collection/${props.data._id}`}>

                <span>
                    <img className='cover' src={props.data.image} alt="hehe" />
                </span>
                <h5 className='cover-title'>{props.data.title} </h5>
            </Link>

            </div>
        : 
        <div className='collection'>
            <Link to={`/collection/${props.data._id}`}>

                <span>
                    <img className='cover-collection' src={props.data.image} alt="hehe" />
                </span>
                <h5 className='cover-title'>{props.data.title} </h5>
            </Link>

        </div>
    )
}
