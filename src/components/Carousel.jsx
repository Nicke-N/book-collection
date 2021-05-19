import React, { useContext } from 'react'
import './Carousel.css'
import { DataContext } from '../context/DataContext'
import BookCover from './BookCover'
import BirchPlank from './BirchPlank'

export default function Carousel() {
    
    const { collection } = useContext(DataContext)
    const date = new Date()
    const currentMonth = date.getMonth() + 1
    const currentYear = date.getFullYear()
    const months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ]
    
    if (collection) {
        var carousels = document.querySelectorAll('.book-carousel');
        if (carousels.length > 0) {
            let count = 0;
            [].forEach.call(carousels, function (carousel) {
                
                let array = []
                Object.entries(collection).map(element => (element[1].monthRead === currentMonth - count && element[1].yearRead === currentYear) ? array.push(element[1]) : null)

                carouselize(carousel, array);

                count ++
            });
        }
    
        function carouselize(carousel, array) {

            var bookList = carousel.querySelector('.carousel-book-list');
            var bookListWidth = 59;
            var bookListSteps = 0;
            var bookAmount = 0;
            var bookAmountVisible = 5;
            var carouselPrev = carousel.querySelector('.carousel-book-next');
            var carouselNext = carousel.querySelector('.carousel-book-prev');
    
            //Count all the products
            [].forEach.call(array, function (product) {
                bookAmount++;
                bookListWidth += 60;
                bookList.style.width = bookListWidth + "vw";
            });
    
            carouselNext.onclick = function () {

                if (bookListSteps < bookAmount - bookAmountVisible ) {
                    bookListSteps++;
                    moveBookList();
                }
            }
            carouselPrev.onclick = function () {
                if (bookListSteps > 0) {
                    bookListSteps--;
                    moveBookList();
                }
            }
    
            // This is a bit hacky, let me know if you find a better way to do this!
            // Move the carousels book-list
            function moveBookList() {
                bookList.style.transform = "translateX(-" + 10 * bookListSteps + "vw)";
            }
        }
    }
   
    return (
        <div>
         
            <div id='carousel1' className="carousel book-carousel">
                <h2 className='carousel-title'>{months[currentMonth-1]} {currentYear}</h2>
                <div className="carousel_view">
                    <span className="carousel_control carousel-book-next"><i className="nav-icon">previous</i></span>
                    <span href="#" className="carousel_control carousel-book-prev"><i className="nav-icon">next</i></span>
                    <ul className="book-list carousel-book-list">
                        {collection && Object.entries(collection).map((element) => {
                         
                            if (element[1].monthRead === currentMonth && element[1].yearRead === currentYear) 
                            return  <li key={element[0]} className="book-list_item">
                                        <BookCover carousel data={element[1]}/>
                                    </li>
                        })

                        }
                    </ul>
                </div>
            </div>
            <BirchPlank />
            <div id='carousel2' className="carousel book-carousel">
            <h2  className='carousel-title'>{months[currentMonth-2]} {currentYear}</h2>
                <div className="carousel_view">
                    <span className="carousel_control carousel-book-next"><i className="nav-icon">previous</i></span>
                    <span href="#" className="carousel_control carousel-book-prev"><i className="nav-icon">next</i></span>
                    <ul className="book-list carousel-book-list">
                    {collection && Object.entries(collection).map((element) => {
                         
                         if (element[1].monthRead === currentMonth-1 && element[1].yearRead === currentYear) 
                         return  <li key={element[0]} className="book-list_item">
                                     <BookCover carousel number={element[0]} data={element[1]}/>
                                 </li>
                     })

                     }
                    </ul>
                </div>
            </div>
            <BirchPlank />
            <div id='carousel3' className="carousel book-carousel">
            <h2  className='carousel-title'>{months[currentMonth-3]} {currentYear}</h2>
                <div className="carousel_view">
                    <span className="carousel_control carousel-book-next"><i className="nav-icon">previous</i></span>
                    <span href="#" className="carousel_control carousel-book-prev"><i className="nav-icon">next</i></span>
                    <ul className="book-list carousel-book-list">
                    {collection && Object.entries(collection).map((element) => {
                         
                         if (element[1].monthRead === currentMonth-2 && element[1].yearRead === currentYear) 
                         return  <li key={element[0]} className="book-list_item">
                                     <BookCover carousel number={element[0]} data={element[1]}/>
                                 </li>
                     })

                     }
                    </ul>
                    
                </div>
            </div>
            <BirchPlank />
            <div id='carousel4' className="carousel book-carousel">
            <h2  className='carousel-title'>{months[currentMonth-4]} {currentYear}</h2>
                <div className="carousel_view">
                    <span className="carousel_control carousel-book-next"><i className="nav-icon">previous</i></span>
                    <span href="#" className="carousel_control carousel-book-prev"><i className="nav-icon">next</i></span>
                    <ul className="book-list carousel-book-list">
                    {collection && Object.entries(collection).map((element) => {
                         
                         if (element[1].monthRead === currentMonth-3 && element[1].yearRead === currentYear) 
                         return  <li key={element[0]} className="book-list_item">
                                     <BookCover carousel number={element[0]} data={element[1]}/>
                                 </li>
                     })

                     }
                    </ul>
                    
                </div>
            </div>
            <BirchPlank />
        </div>
    )
}
