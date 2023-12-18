document.addEventListener('DOMContentLoaded', function () {
  // define all UI variable
  const navToggler = document.querySelector('.nav-toggler');
  const navMenu = document.querySelector('.site-navbar ul');
  const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
  allEventListners();








// functions of all event listners
  function allEventListners() {
    // toggler icon click event
    navToggler.addEventListener('click', togglerClick);
    // nav links click event
    navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
  }

// togglerClick function
  function togglerClick() {
    navToggler.classList.toggle('toggler-open');
    navMenu.classList.toggle('open');
  }

// navLinkClick function
  function navLinkClick() {
    if(navMenu.classList.contains('open')) {
      navToggler.click();
    }
  }
}, false);




//
// $(window).on('scroll',function(){
//   console.log('scroll')
//   var trainPosition = Math.round($(window).scrollTop() / $(window).height() * 100);
//   $('.train').css('transform','translateX('+(trainPosition-50)+'%)');
//
// });

