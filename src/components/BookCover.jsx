import React from 'react'
import { Link } from 'react-router-dom'
import './BookCover.css'
export default function BookCover(props) {
    
    const num = Number(props.number) + 1

    return (
        <div data-slide={num} className="product">
            <Link to={`/collection/${props.data._id}`}>

                <span>
                    <img className='cover' src={props.data.image} alt="hehe" />
                </span>
                <h5 className='cover-title'>{props.data.title} </h5>
            </Link>
              
        </div>
    )
}
