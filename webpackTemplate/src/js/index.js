// polyfills
import '@babel/polyfill';
// styles
import '../scss/style.scss';
// imports
import './_imports';
import SimpleBar from 'simplebar';


function moveSwitcher(event) {
    if (!(event.target.classList.contains("switcher__left-block-title--unselected") || event.target.classList.contains("switcher__right-block-title--unselected") || event.target.classList.contains("switch__bar-container"))) {
        return 0;
    }
    let left, right, bar, leftContent, rightContent;
    if (event.target.classList.contains("switch__bar-container")) {
        left = event.target.parentElement.parentElement.querySelectorAll(".switcher__left-block-title");
        right = event.target.parentElement.parentElement.querySelectorAll(".switcher__right-block-title");
        bar = event.target.querySelector(".switch__bar");
        leftContent = event.target.parentElement.parentElement.parentElement.querySelectorAll(".switcher__left-block-content");
        rightContent = event.target.parentElement.parentElement.parentElement.querySelectorAll(".switcher__right-block-content");
    } else {
        left = event.target.parentElement.querySelectorAll(".switcher__left-block-title");
        right = event.target.parentElement.querySelectorAll(".switcher__right-block-title");
        bar = event.target.parentElement.querySelector(".switch__bar");
        leftContent = event.target.parentElement.parentElement.querySelectorAll(".switcher__left-block-content");
        rightContent = event.target.parentElement.parentElement.querySelectorAll(".switcher__right-block-content");
    }
    left.forEach(x => x.classList.toggle("switcher__left-block-title--unselected"));
    right.forEach(x => x.classList.toggle("switcher__right-block-title--unselected"));
    bar.classList.toggle("switch__bar--right");
    if (window.innerWidth < 780) {
        if (bar.classList.contains("switch__bar--right")) {
            bar.style.width = right[0].clientWidth ? `${right[0].clientWidth}px` : `${right[1].clientWidth}px`;
        } else {
            bar.style.width = left[0].clientWidth ? `${left[0].clientWidth}px` : `${left[1].clientWidth}px`;
        }
    }
    leftContent.forEach(x => x.classList.toggle("switcher__left-block-content--hidden"));
    rightContent.forEach(x => x.classList.toggle("switcher__right-block-content--hidden"));
}


function scaleSwitcherBar() {
    if (window.innerWidth < 780) {
        let left = document.querySelectorAll("switcher__left-block-title");
        let right = document.querySelectorAll("switcher__right-block-title");
        let bar = document.querySelectorAll(".switch__bar");
        bar.forEach(x => {
            if (x.classList.contains("switch__bar--right")) {
                x.style.width = right[0].clientWidth ? `${right[0].clientWidth}px` : `${right[1].clientWidth}px`;
            } else {
                x.style.width = left[0].clientWidth ? `${left[0].clientWidth}px` : `${left[1].clientWidth}px`;
            }
        });
    } else {
        let bar = document.querySelectorAll(".switch__bar");
        bar.forEach(x=> x.style.width = "50%");
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

const switchBarContainer = document.querySelectorAll(".switch__bar-container");
switchBarContainer.forEach(x => x.addEventListener("click", moveSwitcher));
const articlesCategListingContentLabel = document.querySelectorAll(".articles-categ-listing__content label");
articlesCategListingContentLabel.forEach(x => {x.addEventListener("click", choiceArticle)});
document.addEventListener("click", toggleArticleCategList)
document.addEventListener("DOMContentLoaded", scaleSwitcherBar);
window.addEventListener("resize", scaleSwitcherBar);
const switcherLeftBlockTitle = document.querySelectorAll(".switcher__left-block-title");
switcherLeftBlockTitle.forEach(x => x.addEventListener("click", moveSwitcher));
const switcherRightBlockTitle = document.querySelectorAll(".switcher__right-block-title");
switcherRightBlockTitle.forEach(x => x.addEventListener("click", moveSwitcher));
