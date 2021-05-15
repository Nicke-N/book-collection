import React, { useContext } from 'react'
import './Carousel.css'
import { DataContext } from '../context/DataContext'
import BookCover from './BookCover';
import BirchPlank from './BirchPlank';

export default function Carousel2() {
    
    const { collection } = useContext(DataContext)
    const date = new Date()
    const currentMonth = date.getMonth() + 1
    const currentYear = date.getFullYear()
    
    if (collection) {
        var carousels = document.querySelectorAll('.js-product-carousel');
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

            var productList = carousel.querySelector('.js-product-list');
            var productListWidth = 84;
            var productListSteps = 0;
            var productAmount = 0;
            var productAmountVisible = 4;
            var carouselPrev = carousel.querySelector('.js-carousel-prev');
            var carouselNext = carousel.querySelector('.js-carousel-next');
    
            //Count all the products
            [].forEach.call(array, function (product) {
                productAmount++;
                productListWidth += 84;
                productList.style.width = productListWidth + "vw";
            });
    
            carouselNext.onclick = function () {

                if (productListSteps < productAmount - productAmountVisible ) {
                    productListSteps++;
                    moveProductList();
                }
            }
            carouselPrev.onclick = function () {
                if (productListSteps > 0) {
                    productListSteps--;
                    moveProductList();
                }
            }
    
            // This is a bit hacky, let me know if you find a better way to do this!
            // Move the carousels product-list
            function moveProductList() {
                productList.style.transform = "translateX(-" + 21 * productListSteps + "vw)";
            }
        }
    }
   
    return (
        <div>
         
            <div id='carousel1' className="carousel js-product-carousel">
                <h2 className='carousel-title'>{currentMonth.toString().charAt(1) === '' ? 0 + currentMonth.toString() : currentMonth} - {currentYear}</h2>
                <div className="carousel__view">
                    <span className="carousel__control js-carousel-prev"><i className="icon">previous</i></span>
                    <span href="#" className="carousel__control js-carousel-next"><i className="icon">next</i></span>
                    <ul className="product-list js-product-list">
                        {collection && Object.entries(collection).map((element) => {
                         
                            if (element[1].monthRead === currentMonth && element[1].yearRead === currentYear) 
                            return  <li key={element[0]} className="product-list__item">
                                        <BookCover data={element[1]}/>
                                    </li>
                        })

                        }
                    </ul>
                </div>
            </div>
            <BirchPlank />
            <div id='carousel2' className="carousel js-product-carousel">
            <h2  className='carousel-title'>{currentMonth.toString().charAt(1) === '' ? 0 + (currentMonth - 1).toString() : currentMonth} - {currentYear}</h2>
                <div className="carousel__view">
                    <span className="carousel__control js-carousel-prev"><i className="icon">previous</i></span>
                    <span href="#" className="carousel__control js-carousel-next"><i className="icon">next</i></span>
                    <ul className="product-list js-product-list">
                    {collection && Object.entries(collection).map((element) => {
                         
                         if (element[1].monthRead === currentMonth-1 && element[1].yearRead === currentYear) 
                         return  <li key={element[0]} className="product-list__item">
                                     <BookCover number={element[0]} data={element[1]}/>
                                 </li>
                     })

                     }
                    </ul>
                </div>
            </div>

            <div id='carousel3' className="carousel js-product-carousel">
            <h2  className='carousel-title'>{currentMonth.toString().charAt(1) === '' ? 0 + (currentMonth - 2).toString() : currentMonth} - {currentYear}</h2>
                <div className="carousel__view">
                    <span className="carousel__control js-carousel-prev"><i className="icon">previous</i></span>
                    <span href="#" className="carousel__control js-carousel-next"><i className="icon">next</i></span>
                    <ul className="product-list js-product-list">
                    {collection && Object.entries(collection).map((element) => {
                         
                         if (element[1].monthRead === currentMonth-2 && element[1].yearRead === currentYear) 
                         return  <li key={element[0]} className="product-list__item">
                                     <BookCover number={element[0]} data={element[1]}/>
                                 </li>
                     })

                     }
                    </ul>
                    
                </div>
            </div>

        </div>
    )
}
