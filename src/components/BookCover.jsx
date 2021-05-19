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
                </Link>
                <div className='cover-description hidden-book'>
                    <div>
                        {props.data.title}
                    </div>
                    <div>
                        {props.data.author}
                    </div>
                </div>
            </div>
            :
            <div className='collection'>
                <Link to={`/collection/${props.data._id}`}>

                    <span className=''>
                        <img className='cover-collection' src={props.data.image} alt="hehe" />
                    </span>
                </Link>
                <div className='cover-description hidden'>
                    <div>
                        {props.data.title}
                    </div>
                    <div>
                        {props.data.author}
                    </div>
                </div>
            </div>
    )
}
