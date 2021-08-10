// query selectors
const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const navList = document.querySelector(".nav-list");
const burger = document.querySelector(".burger");
const sections = document.querySelectorAll(".section");
const toTop = document.querySelector(".to-top");

// event listeners
logo.addEventListener("click", () => header.classList.remove("mobile"));
burger.addEventListener("click", () => header.classList.toggle("mobile"));

// create the nav menu dynamically
// create fragment element to hold the menu items
const menu = document.createDocumentFragment();
//loop over all elements with class of 'section'
sections.forEach((section) => {
  // create the list element
  const li = document.createElement("li");
  // create the anchor tag element
  const a = document.createElement("a");
  // set the href attribute to link to the id of the section element
  a.setAttribute("href", "#" + section.getAttribute("id"));
  // set the class to be the same value as the id to be used to highlight the active
  a.classList.add(section.getAttribute("id"));
  // set the text of the menu item to the 'data-nav' attribute of the section
  a.innerText = section.dataset.nav;
  // add event listener to hide the mobile menu when clicked
  a.addEventListener("click", () => header.classList.remove("mobile"));
  // append the anchor element to to the list element
  li.appendChild(a);
  // append the list element to the fragment element
  menu.appendChild(li);
});
//append the fragment element to the ul element
navList.appendChild(menu);

// scroll event to highlight the section closest to top of the page and highlight the corresponding entry in the nav menu
addEventListener("scroll", (e) => {
  // check if scrolled beyond the fold to show scroll to top button otherwise hide it
  if (scrollY > innerHeight) toTop.style.display = "block";
  else toTop.style.display = "none";

  // object to track the min difference between to of the page and top of each section
  const min = {
    id: "",
    top: 10000000,
  };
  // loop over sections
  sections.forEach((section) => {
    // get the bounding box of each section
    const bBox = section.getBoundingClientRect();
    // check if the absolute value of the top is less than the current minimum
    if (Math.abs(bBox.top) < min.top) {
      //update the min object
      min.id = section.id;
      min.top = Math.abs(bBox.top);
    }
  });
  // loop over sections to update the classes
  sections.forEach((section) => {
    // check if this section is the minimum
    if (section.id === min.id) {
      // add the class 'selected' to the section
      section.classList.add("selected");
      // add the class 'active' to the corresponding entry in the nav bar
      navList.querySelector("." + section.classList[0]).classList.add("active");
    } else {
      // if it's not the minimum remove the classes
      section.classList.remove("selected");
      navList.querySelector("." + section.classList[0]).classList.remove("active");
    }
  });
});
