import React from 'react'
import { Helmet } from 'react-helmet'

export default function Header() {
    return (
        <div className='application'>
            <Helmet>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
                <title>My Collection</title>
            </Helmet>
        </div>
    )
}
