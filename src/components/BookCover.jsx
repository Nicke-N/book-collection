import React from 'react'
import { Link } from 'react-router-dom'
import './BookCover.css'
export default function BookCover(props) {
    
    const num = Number(props.number) + 1
    console.log(num)
    console.log(props.data)
    return (
        <div data-slide={num} className="product">
            <Link to={`/collection/${props.data._id}`}>

                <span>
                    <img className='cover' src={props.data.image} alt="hehe" />
                </span>
                <h5>{props.data.title} </h5>
            </Link>
              
        </div>
    )
}
