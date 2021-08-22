// query selectors
const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const navList = document.querySelector(".nav-list");
const burger = document.querySelector(".burger");
const sections = document.querySelectorAll(".section");
const toTop = document.querySelector(".to-top");

// event listeners
logo.addEventListener("click", (e) => {
  e.preventDefault();
  header.classList.remove("mobile");
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
burger.addEventListener("click", () => header.classList.toggle("mobile"));
toTop.addEventListener("click", (e) => {
  e.preventDefault();
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// create the nav menu dynamically
const menu = document.createDocumentFragment(); // create fragment element to hold the menu items
sections.forEach((section) => {
  //loop over all elements with class of 'section'
  const li = document.createElement("li"); // create the list element
  const a = document.createElement("a"); // create the anchor tag element
  a.setAttribute("href", "#" + section.getAttribute("id")); // set the href attribute to link to the id of the section element
  a.classList.add(section.getAttribute("id")); // set the class to be the same value as the id to be used to highlight the active
  a.innerText = section.dataset.nav; // set the text of the menu item to the 'data-nav' attribute of the section
  a.addEventListener("click", (e) => {
    // add event listener to smooth scroll and hide the mobile menu when clicked
    e.preventDefault();
    header.classList.remove("mobile");
    document.getElementById(e.target.classList[0]).scrollIntoView({ behavior: "smooth" });
  });
  li.appendChild(a); // append the anchor element to to the list element
  menu.appendChild(li); // append the list element to the fragment element
});
navList.appendChild(menu); //append the fragment element to the ul element

// scroll event to highlight the section closest to top of the page and highlight the corresponding entry in the nav menu
addEventListener("scroll", (e) => {
  if (scrollY > innerHeight) toTop.style.display = "block";
  // check if scrolled beyond the fold to show scroll to top button
  else toTop.style.display = "none"; // otherwise hide it

  // object to track the min difference between to of the page and top of each section
  const min = {
    id: "",
    top: 10000000,
  };
  sections.forEach((section) => {
    // loop over sections
    const bBox = section.getBoundingClientRect(); // get the bounding box of each section
    if (Math.abs(bBox.top) < min.top) {
      // check if the absolute value of the top is less than the current minimum
      //update the min object
      min.id = section.id;
      min.top = Math.abs(bBox.top);
    }
  });

  if (min.id === sections[0].id && min.top > innerHeight - 100) {
    // check if the closest is the first section but it is almost hidden
    // reset minimum (make no section selected)
    min.id = "";
    min.top = 10000000;
  }

  sections.forEach((section) => {
    // loop over sections to update the classes
    if (section.id === min.id) {
      // check if this section is the minimum
      section.classList.add("selected"); // add the class 'selected' to the section
      navList.querySelector("." + section.classList[0]).classList.add("active"); // add the class 'active' to the corresponding entry in the nav bar
    } else {
      // if it's not the minimum remove the classes
      section.classList.remove("selected");
      navList.querySelector("." + section.classList[0]).classList.remove("active");
    }
  });
});
