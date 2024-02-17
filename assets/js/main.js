import {toggle} from "./navbar.js";
import {Slides, reproduceAuto} from "./slides.js";

// Set navbar
document.getElementById("main-nav-drawer").onclick = toggle;

// Set main carousel
if(window.location.pathname.includes("index") || window.location.pathname === "/") {
    const mainSlidesCount = document.getElementById("main-carousel").getElementsByClassName("page").length;
    const mainSlides = new Slides("mainSlide", mainSlidesCount);
    reproduceAuto(mainSlides, 5000)
}