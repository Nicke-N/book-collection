import React from 'react'
import { Link } from 'react-router-dom'

export default function BookCover(props) {

    return (
        <div>
            <Link to={`/collection/${props.data._id}`}>

            <div><img src={props.data.image} alt="hehe" /></div>
              <h5>{props.data.title} </h5>
            </Link>
              
        </div>
    )
}
