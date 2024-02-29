/*PARALLAX EFFECT*/
const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0, yValue = 0;
let rotateDegree = 0;

function update(cursorPosition){
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
    
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;
    
        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotateSpeed}deg)`;
      });
}

update(0);

window.addEventListener("mousemove", (e) => {
    if(timeline.isActive()) return;
    
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
});

if (window.innerWidth >= 725){
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else{
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

/* GSAP Animation */

let timeline = gsap.timeline();

timeline.from(
    ".bg", 
    {
    top: `${document.querySelector(".bg").offsetHeight / 2 - 200}px`,
    duration: 1.5,
    ease: "power3.out"
    },
);

timeline.from(".text h2",{
    y:window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
    duration: 1,
    ease: "power3.out"
},
"1"
)
.from(".text h1",{
    y: -150,
    opacity: 0,
    duration: 1.5,
},
"1"
)
.from(".hand",{
    y:window.innerHeight - document.querySelector(".hand").getBoundingClientRect().top + 200,
    duration: 1,
},
"1"
)
.from(".drone",{
    y:window.innerHeight - document.querySelector(".drone").getBoundingClientRect().bottom - 200,
    duration: 1,
},
"1"
)
.from(".hide",{
    opacity: 0,
    duration: 1.5,
}, 
"1.5"
);



/* GALLARY SLIDER */

//At the start will show the first image
$('.sliderimg img.slide:first-child');
//Keep track of the image currently being visualized
var curr = $('.sliderimg img.slide:first-child');


$('#nextbtn').on('click', function() {
    //Hide Current Image
    curr.hide();
    //Find Next Image
    var next = curr.next();
    //If theres no next image (is the last img), go back to first
    if (next.length == 0) next = $('.sliderimg img:first-child');
    //Fade In
    next.fadeIn(200);
    //Save in curr the current Image
    curr = next;
    const link = $('.slider-nav a').eq(next.index());
    link.focus();
    return false;
});

$('#prevbtn').on('click', function() {
    curr.hide();
    var prev = curr.prev();
    if (prev.length == 0) prev = $('.sliderimg img:last-child');
    prev.fadeIn(200);
    curr = prev;
    const link = $('.slider-nav a').eq(prev.index());
    link.focus();
    return false;
});

// Get all the slider buttons
const sliderButtons = document.getElementsByClassName('slider-nav')[0].getElementsByTagName('a');

// Attach click event listener to each button
for (let i = 0; i < sliderButtons.length; i++) {
  sliderButtons[i].addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the index of the clicked button
    const buttonIndex = i;

    // Hide all slides
    const slides = document.getElementsByClassName('slide');
    for (let j = 0; j < slides.length; j++) {
      slides[j].style.display = 'none';
    }

    // Show the corresponding slide
    slides[buttonIndex].style.display = 'block';
    curr = $('.sliderimg img.slide').eq(buttonIndex); // Update curr based on clicked button
    const link = $('.slider-nav a').eq(buttonIndex);
    link.focus();
  });
}
















/*REVEAL ELEMENTS ON SCROLL*/

window.addEventListener('scroll',reveal);

function reveal(){
  var reveals = document.querySelectorAll('.reveal');

  for(var i = 0; i < reveals.length; i++){

    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if(revealtop < windowheight - revealpoint){
      reveals[i].classList.add('active');
    }
  }
}









