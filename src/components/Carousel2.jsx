import React, { useEffect, useContext } from 'react'
import './Carousel2.css'
import { DataContext } from '../context/DataContext'
import BookCover from './BookCover';

export default function Carousel2() {
    
    const { collection } = useContext(DataContext)

    if (collection) {
        var carousels = document.querySelectorAll('.js-product-carousel');
        if (carousels.length > 0) {
            [].forEach.call(carousels, function (carousel) {
                carouselize(carousel);
            });
        }
    
        function carouselize(carousel) {

            var productList = carousel.querySelector('.js-product-list');
            var productListWidth = 80;
            var productListSteps = 0;
            var productAmount = 0;
            var productAmountVisible = 4;
            var carouselPrev = carousel.querySelector('.js-carousel-prev');
            var carouselNext = carousel.querySelector('.js-carousel-next');
    
            //Count all the products
            [].forEach.call(collection, function (product) {
                productAmount++;
                productListWidth += 80;
                productList.style.width = productListWidth + "vw";
            });
    
            carouselNext.onclick = function () {
                console.log(productListSteps)
                console.log(productAmount)
                console.log(productAmountVisible)
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
                productList.style.transform = "translateX(-" + 20 * productListSteps + "vw)";
            }
        }
    }
   
    return (
        <div>
            <div className="carousel js-product-carousel">
                <div className="carousel__view">
                    <span className="carousel__control js-carousel-prev"><i className="icon">previous</i></span>
                    <span href="#" className="carousel__control js-carousel-next"><i className="icon">next</i></span>
                    <ul className="product-list js-product-list">
                        {collection && Object.entries(collection).map((element) => {
                            return  <li key={element[0]} className="product-list__item">
                                        <BookCover number={element[0]} data={element[1]}/>
                                    </li>
                        })

                        }
                    </ul>
                </div>
            </div>
            <div className="carousel js-product-carousel">
                <div className="carousel__view">
                    <span className="carousel__control js-carousel-prev"><i className="icon">previous</i></span>
                    <span href="#" className="carousel__control js-carousel-next"><i className="icon">next</i></span>
                    <ul className="product-list js-product-list">
                        <li className="product-list__item">
                            <div data-slide="1" className="product">
                                <span>1</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="2" className="product">
                                <span>2</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="3" className="product">
                                <span>3</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="4" className="product">
                                <span>4</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="5" className="product">
                                <span>5</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="carousel js-product-carousel">
                <div className="carousel__view">
                    <span className="carousel__control js-carousel-prev"><i className="icon">previous</i></span>
                    <span href="#" className="carousel__control js-carousel-next"><i className="icon">next</i></span>
                    <ul className="product-list js-product-list">
                        <li className="product-list__item">
                            <div data-slide="1" className="product">
                                <span>1</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="2" className="product">
                                <span>2</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="3" className="product">
                                <span>3</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="4" className="product">
                                <span>4</span>
                            </div>
                        </li>
                        <li className="product-list__item">
                            <div data-slide="5" className="product">
                                <span>5</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>

        </div>
    )
}
