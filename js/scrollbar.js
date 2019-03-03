"use strict";

// const scrollbarTrack = document.querySelector(".container__scrollbar-track");
// const scrollbar = document.querySelector(".container__scrollbar-thumb"); 
// const content = document.querySelector(".container__bottom"); 

// // scrollbar.style.width = scrollbarTrack.clientWidth * content.clientWidth / content.scrollWidth + "px"; // Set Scrollbar's width  
//     console.log("Scrollbar Track Viewable Width: ", scrollbarTrack.clientWidth); // Matomas plotis
//     console.log("Content Viewable Width: ", content.clientWidth); // Turinio matomas plotis
//     console.log("Content Entire Width: ", content.scrollWidth); // Visas plotis

// // Scrollbar Thumb's Parameters Function
// let changeScrollbar = () => {
//     scrollbar.style.width = scrollbarTrack.clientWidth * content.clientWidth / content.scrollWidth + "px"; // Set Scrollbar's width   
//     scrollbar.style.left = scrollbarTrack.clientWidth * content.scrollLeft / content.scrollWidth + "px"; //Move Scrollbar Thumb 
// }

// // Change Scrollbar Thumb when Content is Scrolled 
// content.addEventListener("scroll", () => {
//     changeScrollbar();     
    
//     // console.log("Content Viewable Width: ", content.clientWidth); // Turinio matomas plotis
//     // console.log("Scrollbar Track Viewable Width: ", scrollbarTrack.clientWidth); // Matomas plotis
//     // console.log("Entire Width: ", content.scrollWidth); // Visas plotis
//     // console.log("Scrolled Horizontally: ", content.scrollLeft); // Kiek nuscrollinta horizontaliai
// });

// Set Initial Scrollbar Thumb's Parameters
// let scrollEvent = new Event("scroll");
// content.dispatchEvent(scrollEvent);

// Change Scrollbar Thumb when Window is Resized
// window.addEventListener("resize", () => {
//     changeScrollbar(); 
// });

// 

// scrollbar.addEventListener("mousedown", (start) => {
//     start.preventDefault();
//     let scrollbarLeftOffset = scrollbar.offsetLeft;
    
//     let onMove = (end) => {
//         let mouseMovemenetDiff = end.pageX - start.pageX;
//         scrollbar.style.left = Math.min(scrollbarTrack.clientWidth - scrollbar.clientWidth, Math.max(0, scrollbarLeftOffset + mouseMovemenetDiff)) + 'px';
//         content.scrollLeft = (content.scrollWidth * scrollbar.offsetLeft / scrollbarTrack.clientWidth);
//         // content.scrollLeft = -50;
//         console.log(content.scrollLeft);
//     }

//     // Add Function when Mouse is Clicked
//     document.addEventListener("mousemove", onMove);
    
//     // Remove Function when Mouse is Unclicked
//     document.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMove));
// });

// Variables
const container = document.querySelector(".container"); 
const content = document.querySelector(".container__bottom--desktop");
const contentMobile = document.querySelector(".container__bottom--mobile");
const containerMovies = document.querySelectorAll(".container__movies");
const containerMovieMobile = document.querySelectorAll(".container__movie--mobile");
const slides = document.querySelectorAll(".container__movies");
const containerImages = document.querySelectorAll(".container__movie-img img");
const scrollbarLeftBtn = document.querySelector(".container__scrollbar-btn--left");
const scrollbarRightBtn = document.querySelector(".container__scrollbar-btn--right"); 
const scrollbarTrack = document.querySelector(".container__scrollbar-track");
const scrollbar = document.querySelector(".container__scrollbar-thumb"); 
let playSlides;

// Set Slide's Width and Slider's Height Function 
let setDimensions = () => {
    // Set .container__movies Width
    for (let i = 0; i < containerMovies.length; i++) {
        containerMovies[i].style.width = `${container.offsetWidth}px`; 
    }
    
    // Set .container_movie--mobile Width
    for (let i = 0; i < containerMovieMobile.length; i++) {
        containerMovieMobile[i].style.width = `${container.offsetWidth}px`; 
    }
    
    // Give Container Height
    if (getComputedStyle(contentMobile, null).display === "none") {
        container.style.height = `${content.offsetHeight + 110}px`;
    } else {
        container.style.height = `${contentMobile.offsetHeight + 110}px`;
        // console.log("Mobile");    
    }
}

// Add .container__movies--load Class to Visible Movie 
let addClassList = (containerForMovies) => {
    for(let i = 0; i < containerForMovies.length; i++) {
        // If Movie Block has Class .container__movies--load, Show Images
        if (containerForMovies[i].classList.contains("container__movies--load")) {
            if (containerForMovies[i - 1]) {
                containerForMovies[i - 1].classList.add("container__movies--load");
            }
        }
    }
}

// Lazy Load Images Function
let lazyLoad = (containerForMovies) => {
    for(let i = 0; i < containerForMovies.length; i++) {
        // If Movie Block has Class .container__movies--load, Show Images
        if (containerForMovies[i].classList.contains("container__movies--load")) {
            for(let j = 0; j < containerForMovies[i].getElementsByTagName("img").length; j++) {
                containerForMovies[i].getElementsByTagName("img")[j].src = containerForMovies[i].getElementsByTagName("img")[j].dataset.src;
            }
        } else {
            for(let j = 0; j < containerForMovies[i].getElementsByTagName("img").length; j++) {
                containerForMovies[i].getElementsByTagName("img")[j].src = "";
            }
        }
    }
}

// Call Lazy Load Function Initially on Desktop
lazyLoad(containerMovies);

// Call Lazy Load Function Initially on Mobile
lazyLoad(containerMovieMobile);

// Set Slide's Width and Slider's Height
setDimensions();

// Move Scrollbar Function
let moveScrollbar = () => {
    let scrollbarMove = (scrollbarTrack.clientWidth - scrollbar.clientWidth) / (containerMovies.length - 1);
    
    scrollbar.style.transition = 'transform 0.4s ease-in-out';        
    scrollbar.style.transform = `translateX(${scrollbarMove * counter}px)`;
}

// Activate Scrollbar
scrollbar.addEventListener("mousedown", (start) => {
    let movementDiff;
    
    // On Move Function
    let move = (end) => {  
        movementDiff = end.pageX - start.pageX;
    }
    
    scrollbarTrack.addEventListener("mousemove", move);

    // On End Move Function
    let endMove = () => {
        if (movementDiff > 0) {
            if (counter < slides.length - 1) {

                // Add .container__movies--load Class to Visible Movie
                addClassList(containerMovies);
                
                content.style.transition = 'transform 0.4s ease-in-out';    
                counter++;    
                content.style.transform = `translateX(${slideSize * counter}px)`;  
                
                // Call Lazy Load Function on Desktop
                lazyLoad(containerMovies);
                
                // Move Scrollbar
                moveScrollbar();        
            }
        } else {
            if (counter > 0) {
                content.style.transition = 'transform 0.4s ease-in-out';    
                counter--;
                content.style.transform = `translateX(${slideSize * counter}px)`;       
        
                // Move Scrollbar
                moveScrollbar();
            }  
        }
        scrollbar.removeEventListener("mousemove", move); // Remove Move Fuction
        scrollbar.removeEventListener("mouseup", endMove); // Remove endMove Function
    }
    
    scrollbarTrack.addEventListener("mouseup", endMove);
});


let counter = 0; // Initial Value of the Counter
let slideSize = slides[0].offsetWidth; // Viewable Slide's Width 

// Move Slide to the Left on Left Button Click
scrollbarLeftBtn.addEventListener("click", () => {
    if (counter > 0) {
        content.style.transition = 'transform 0.4s ease-in-out';    
        counter--;
        content.style.transform = `translateX(${slideSize * counter}px)`;       

        // Move Scrollbar
        moveScrollbar();
    } 
});

// Move Slide to the Right on Right Button Click
scrollbarRightBtn.addEventListener("click", () => {
    if (counter < slides.length - 1) {

        // Add .container__movies--load Class to Visible Movie
        addClassList(containerMovies);
        
        content.style.transition = 'transform 0.4s ease-in-out';    
        counter++;    
        content.style.transform = `translateX(${slideSize * counter}px)`;  
        
        // Call Lazy Load Function on Desktop
        lazyLoad(containerMovies);
        
        // Move Scrollbar
        moveScrollbar();        
    }
});

// Start Autoplay Function
let autoplaySlides = () => {
    // Slide Movies to the Right Function
    let slideElements = () => {
        if (counter < slides.length - 1) {

            // Add .container__movies--load Class to Visible Movie
            addClassList(containerMovies);

            content.style.transition = 'transform 0.4s ease-in-out';    
            counter++;       
            content.style.transform = `translateX(${slideSize * counter}px)`;

            // Call Lazy Load Function on Desktop            
            lazyLoad(containerMovies);

            // Move Scrollbar
            moveScrollbar();
        }
    }

    // Set Interval Only in Desktop Version
    if (getComputedStyle(contentMobile, null).display === "none") {
        if (playSlides) {
            clearInterval(playSlides);    
        }
        playSlides = setInterval(slideElements, 10000);
    } else {        
        if (playSlides) {
            clearInterval(playSlides);
            playSlides = null;
        }
    }

    // Stop Sliding on Mouse Hover
    content.addEventListener("mouseenter", () => {
        if (playSlides) {
            clearInterval(playSlides);
            playSlides = null;
        }
    });

    // Resume Sliding when Mouse Leaves Movies
    content.addEventListener("mouseleave", () => {  
        if (playSlides === null) {
            playSlides = setInterval(slideElements, 10000);
        }
    });
}

// Call Autoplay Function on Window Load
window.addEventListener("load", () => {
    autoplaySlides();
});

// On Mobile
let mobileSlideSize = container.offsetWidth; // Viewable Mobile Slide's Width 
let mobileCounter = 0; // Initial Value of the Mobile Counter

// Swipe to Scroll on Mobile Devices Function
let swipeToScroll = () => {
    // On Touch
    contentMobile.addEventListener("touchstart", (start) => {
        let movementDiff;
    
        // On Move Function
        let move = (end) => {  
            movementDiff = end.touches[0].clientX - start.touches[0].clientX;    
        }
        
        contentMobile.addEventListener("touchmove", move);
    
        // On End Move Function
        let endMove = () => {
            if (movementDiff > 0) {
                if (mobileCounter < containerMovieMobile.length - 1) {
                    // Add .container__movies--load Class to Visible Movie
                    addClassList(containerMovieMobile);

                    contentMobile.style.transition = 'transform 0.4s ease-in-out';    
                    mobileCounter++;     
                    contentMobile.style.transform = `translateX(${mobileSlideSize * mobileCounter}px)`;  

                    // Call Lazy Load Function on Mobile            
                    lazyLoad(containerMovieMobile);
                }
            } else {
                if (mobileCounter > 0) {
                    contentMobile.style.transition = 'transform 0.4s ease-in-out';    
                    mobileCounter--;
                    contentMobile.style.transform = `translateX(${mobileSlideSize * mobileCounter}px)`;  
                }
                
            }
            contentMobile.removeEventListener("touchmove", move); // Remove Move Fuction
            contentMobile.removeEventListener("touchend", endMove); // Remove endMove Function
        }
        
        contentMobile.addEventListener("touchend", endMove);
    });
}

// Call Swipe to Scroll
swipeToScroll();

// On Resizing Window
window.addEventListener("resize", () => {
    // In Mobile Version Stop Desktop Version Autoplay
    if (getComputedStyle(contentMobile, null).display === "flex") {
        if (playSlides) {
            clearInterval(playSlides);
            playSlides = null;
        }
    } 
    autoplaySlides(); // Call Autoplay Function  
    
    setDimensions() // Set Slide's Width and Slider's Height

    // Move Scrollbar
    moveScrollbar();
    scrollbar.style.transition = 'none';            
    
    slideSize = container.offsetWidth; // Make Slide Size Equal to Viewable Width on Desktop
    mobileSlideSize = container.offsetWidth; // Make Slide Size Equal to Viewable Width on Mobile
    content.style.transition = 'none'; // Remove Transition on Desktop       
    contentMobile.style.transition = 'none'; // Remove Transition on Mobile       
    content.style.transform = `translateX(${container.offsetWidth * counter}px)`; // Change Pixels Size by which Slide Moves on Desktop  
    contentMobile.style.transform = `translateX(${container.offsetWidth * mobileCounter}px)`; // Change Pixels Size by which Slide Moves on Mobile  
});