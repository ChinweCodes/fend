/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
var sectionsData = [];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll to anchor ID using scrollTO event

// scroll listener
document.body.onscroll = function(event){
    let sectionInViewPortId = testSectionsInViewPort();
    if (sectionInViewPortId !== null){
        setSectionActive(sectionInViewPortId);
    }
}

// Function tests every section to see what is 
// in the view port
function testSectionsInViewPort(){
    for(let i = 0; i < sectionsData.length; i++){
        let section = document.getElementById(sectionsData[i]["id"]);

        if (isInViewport(section)){
          
            return sectionsData[i]["id"];
        }
    }
    return null;
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
document.body.onload = function(){
    const sections = document.getElementsByTagName("section");  
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        let sectionData = {
            "id" : section.getAttribute("id"),
            "data-nav":section.getAttribute("data-nav")
        }
        sectionsData.push(sectionData);
    }
    buildMenu();  
}

// Build nav menu 
function buildMenu(){
    let navBar = document.getElementById("navbar__list");
    for(let i = 0; i < sectionsData.length; i++){
        let navItem = document.createElement("li");
        navItem.innerHTML = sectionsData[i]["data-nav"];
        navItem.setAttribute("id","nav_"+sectionsData[i]["id"]);
        // First navigation item should have be active
        navItem.setAttribute("class","menu__link"+(i==0?" active":""));
        navItem.setAttribute("data-section",sectionsData[i]["id"]);
        navItem.addEventListener("click",onNavItemClickListener);
        navBar.appendChild(navItem);
    }
}
// Scroll to section on link click
function onNavItemClickListener(event){
    //Gt the Id of the seection
    let sectionId = event.target.getAttribute("data-section");
    let section   = document.getElementById(sectionId);
    setSectionActive(sectionId);
    section.scrollIntoView(true);
   
}

// Set sections as active
function setSectionActive(sectionId){
    for(let i = 0; i < sectionsData.length; i++){
        let section = document.getElementById(sectionsData[i]["id"]);
        let navItem = document.getElementById("nav_"+sectionsData[i]["id"]);
        if (sectionsData[i]["id"] === sectionId){
            section.setAttribute("class","your-active-class");
            navItem.setAttribute("class","menu__link active");
        }else{
            section.removeAttribute("class");
            navItem.setAttribute("class","menu__link ");
        }
    }
}

