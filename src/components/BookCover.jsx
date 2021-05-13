import React from 'react'
import { Link } from 'react-router-dom'
import './BookCover.css'
export default function BookCover(props) {
    // var width = window.innerWidth
    //     || document.documentElement.clientWidth
    //     || document.body.clientWidth;

    // var height = window.innerHeight
    //     || document.documentElement.clientHeight
    //     || document.body.clientHeight;

    //     console.log(width / 58)
    //     console.log(height / 13)
    return (
        <div className="product">
            <Link to={`/collection/${props.data._id}`}>

                <span>
                    <img className='cover' src={props.data.image} alt="hehe" />
                </span>
                <h5 className='cover-title'>{props.data.title} </h5>
            </Link>

        </div>
    )
}
