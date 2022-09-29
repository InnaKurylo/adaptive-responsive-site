"use strict";
// Header burger button
const burgerButton = document.querySelector(".menu__wrapper__burger");
const dropDownMenu = document.querySelector(".header__navigation");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("open");
  dropDownMenu.classList.toggle("absolute");
});
//pricing__tags
let hover= document.querySelector('.hover');
const pricing__wrapper = document.querySelector('.pricing__wrapper');
pricing__wrapper.addEventListener('click', (ev)=>{
  hover.classList.toggle('hover');
  const el = ev.target.closest('.pricing__tags');
  if(el){
        el.classList.toggle('hover');
        hover=el;
  }

  
})



