"use strict";const burgerButton=document.querySelector(".menu__wrapper__burger"),dropDownMenu=document.querySelector(".header__navigation");burgerButton.addEventListener("click",()=>{burgerButton.classList.toggle("open"),dropDownMenu.classList.toggle("absolute")});let hover=document.querySelector(".hover");const pricing__wrapper=document.querySelector(".pricing__wrapper");pricing__wrapper.addEventListener("click",e=>{hover.classList.toggle("hover");const r=e.target.closest(".pricing__tags");r&&(r.classList.toggle("hover"),hover=r)});