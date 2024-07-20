// polyfills
import '@babel/polyfill';
// styles
import '../scss/style.scss';
// imports
import './_imports';
import SimpleBar from 'simplebar';


function moveSwitcher(event) {
    if (!(event.target.classList.contains("left-block-title--unselected") || event.target.classList.contains("right-block-title--unselected"))) {
        return 0;
    }
    let left = document.querySelectorAll(".switcher .left-block-title");
    let right = document.querySelectorAll(".switcher .right-block-title");
    let bar = document.querySelector(".switch__bar");
    let leftContent = document.querySelector(".switcher .left-block-content");
    let rightContent = document.querySelector(".switcher .right-block-content");
    left.forEach(x => x.classList.toggle("left-block-title--unselected"));
    right.forEach(x => x.classList.toggle("right-block-title--unselected"));
    bar.classList.toggle("switch__bar--right");
    if (window.innerWidth < 780) {
        if (bar.classList.contains("switch__bar--right")) {
            bar.style.width = right[0].clientWidth ? `${right[0].clientWidth}px` : `${right[1].clientWidth}px`;
        } else {
            bar.style.width = left[0].clientWidth ? `${left[0].clientWidth}px` : `${left[1].clientWidth}px`;
        }
    }
    leftContent.classList.toggle("left-block-content--hidden");
    rightContent.classList.toggle("right-block-content--hidden");
}


function scaleSwitcherBar() {
    if (window.innerWidth < 780) {
        let left = document.querySelectorAll(".switcher .left-block-title");
        let right = document.querySelectorAll(".switcher .right-block-title");
        let bar = document.querySelector(".switch__bar");
        if (bar.classList.contains("switch__bar--right")) {
            bar.style.width = right[0].clientWidth ? `${right[0].clientWidth}px` : `${right[1].clientWidth}px`;
        } else {
            bar.style.width = left[0].clientWidth ? `${left[0].clientWidth}px` : `${left[1].clientWidth}px`;
        }
    } else {
        let bar = document.querySelector(".switch__bar");
        bar.style.width = "50%";
    }
}


// let articleCategListScrollBar = new SimpleBar('.articles-categ-listing__content-container', {});


function toggleArticleCategList(event) {
    let articleCategSelect = document.querySelector(".articles-categ-listing__select")
    if (event.target.classList.length === 0 || !event.target.classList[0].includes("articles-categ-listing")) {
        articleCategSelect.setAttribute("data-state", "");
        return 0;
    } else {
        articleCategSelect.setAttribute("data-state", "active");
    }
}


function choiceArticle(event) {
    let title = document.querySelector(".articles-categ-listing__title");
    if (event.target.getAttribute("for") === "all") {
        title.textContent = title.getAttribute("data-default");
        title.classList.add("articles-categ-listing__title--default");
    } else {
        title.textContent = event.target.textContent;
        title.classList.remove("articles-categ-listing__title--default");
    }
    document.querySelector(".articles-categ-listing__select").setAttribute("data-state", "");
}


document.querySelectorAll(".articles-categ-listing__content label").forEach(x => {x.addEventListener("click", choiceArticle)});
document.addEventListener("click", toggleArticleCategList)
document.addEventListener("DOMContentLoaded", scaleSwitcherBar);
window.addEventListener("resize", scaleSwitcherBar);
document.querySelectorAll(".switcher .left-block-title").forEach(x => x.addEventListener("click", moveSwitcher));
document.querySelectorAll(".switcher .right-block-title").forEach(x => x.addEventListener("click", moveSwitcher));
