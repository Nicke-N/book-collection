import React, { useEffect } from 'react'
import './Carousel.css'

export default function Carousel() {

    'use strict';
	var slides = document.querySelectorAll('.testimonial-item'),
		 button = document.getElementById('button'),
		 arrows = document.querySelectorAll('.lnr'),
		 carouselCount = 0,
		 scrollInterval,
		 interval = 5000;

    useEffect(() => {
        
    }, [])
    
   
	if (arrows.length > 0) {
           
        arrows[0].addEventListener('click', function (e) {
            e = e || window.event;
            e.preventDefault();
            carouselCount -= 100;
            slider();
            if (e.type !== 'autoClick') {
                clearInterval(scrollInterval);
                // scrollInterval = setInterval(autoScroll, interval);
            }
        });
        arrows[1].addEventListener('click', sliderEvent);
        // arrows[1].addEventListener('autoClick', sliderEvent);
    }
	
	function sliderEvent(e) {
		e = e || window.event;
		e.preventDefault();
		carouselCount += 100;
		slider();
		if (e.type !== "autoClick") {
			clearInterval(scrollInterval);
			// scrollInterval = setInterval(autoScroll, interval);
		}
	}
	
	function slider() {
		switch (carouselCount) {
			case -100:
				carouselCount = 0;
				break;
			case 300:
				carouselCount = 0;
				break;
			default:
				break;
		}
		console.log(carouselCount);
		for (var i = 0; i < slides.length; i += 1) {
			slides[i].setAttribute('style', 'transform:translateX(-' + carouselCount + '%)');
		}
	}
	
	// create new Event to dispatch click for auto scroll
	// var autoClick = new Event('autoClick');
	// function autoScroll() {
	// 	arrows[1].dispatchEvent(autoClick);
	// }
	
	// set timing of dispatch click events
	// scrollInterval = setInterval(autoScroll, interval);
	

    return (
        <div className="callout-text">

        <div className="testimonial-carousel">
            
            <div className="icon-container">
                <span className="lnr lnr-arrow-left-circle"> <img alt='Loading' className="navArrow" src="https://img.icons8.com/ios-glyphs/60/666666/chevron-left.png"/></span>
            </div>
            <div className="testimonial-items">
                <div className="testimonial-item first">
                    <blockquote>
                        <p className="testimonial-quote">Thank you very much for the great job you made of my cooker. You made a horrible job look easy and I can't thank you enough. I hate cleaning oven racks and they sparkle now. Thanks again.</p>
                        <p className="testimonial-author"><cite>— H Scott, Edinburgh</cite></p>
                    </blockquote>
                </div>
                <div className="testimonial-item second">
                    <blockquote>
                        <p className="testimonial-quote">Just a wee note to say 'WOW!' and thank you to you, and colleagues. Our old flat is sparkling and looks absolutely fantastic, I still can't believe how clean the oven is! Thanks so much again for all your hard work yesterday.</p>
                        <p className="testimonial-author"><cite>— Nicola, Leith, Edinburgh</cite></p>
                    </blockquote>
                </div>
                <div className="testimonial-item third">
                    <blockquote>
                        <p className="testimonial-quote">As mentioned I was very satisfied with the quality of the cleaning. The lady was very cheerful and enthusiastic. I will definitely consider using Quality Cleaning Services again.</p>
                        <p className="testimonial-author"><cite>— W S Khan, Lothian Road, Edinburgh</cite></p>
                    </blockquote>
                </div>
            </div>
           
            <div className="icon-container">
                <span className="lnr lnr-arrow-right-circle"><img alt='Loading' className="navArrow" src="https://img.icons8.com/ios-glyphs/60/666666/chevron-right.png"/></span>
            </div>
        </div>
    </div>
    
    )
}
