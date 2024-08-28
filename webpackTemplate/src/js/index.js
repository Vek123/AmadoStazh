// polyfills
import '@babel/polyfill';
// styles
import '../scss/style.scss';
// imports
import './_imports';
import SimpleBar from 'simplebar';


const mainDelay = 300;

window.addEventListener("load", () => document.body.classList.remove("preload"));

function docOnClick(event) {
    toggleMapCitiesList(event);
}

let headerBottom = document.querySelector('.header-bottom');
function fixHeader() {
    if (window.scrollY >= document.querySelector('.header-top').clientHeight && !document.querySelector('body').classList.contains('modal-opened')) {
        headerBottom.classList.add("header-bottom--fixed");
    } else if (window.screen.width > 370) {
        headerBottom.classList.remove("header-bottom--fixed");
    }
}


function moveSwitcher(event) {
    if (!(event.target.classList.contains("switcher__left-block-title--unselected") || event.target.classList.contains("switcher__right-block-title--unselected") || event.target.classList.contains("switch__bar-container"))) {
        return 0;
    }
    let switcher, left, right, bar, leftContentName, leftContent, rightContentName, rightContent;
    switcher = event.target.closest(".switcher");
    
    leftContentName = switcher.getAttribute("data-left-content-class");
    rightContentName = switcher.getAttribute("data-right-content-class");
    let parentNodeName = switcher.getAttribute("data-parent-node");
    let parentNode = parentNodeName ? switcher.closest(`.${parentNodeName}`) : "";
    
    if (parentNode) {
        leftContent = parentNode.querySelector(`.${leftContentName}`);
        rightContent = parentNode.querySelector(`.${rightContentName}`);
    } else {
        leftContent = switcher.querySelector(`.${leftContentName}`);
        rightContent = switcher.querySelector(`.${rightContentName}`);
    }
    
    left = switcher.querySelectorAll(".switcher__left-block-title");
    right = switcher.querySelectorAll(".switcher__right-block-title");
    bar = switcher.querySelector(".switch__bar");
    left.forEach(x => x.classList.toggle("switcher__left-block-title--unselected"));
    right.forEach(x => x.classList.toggle("switcher__right-block-title--unselected"));
    bar.classList.toggle("switch__bar--right");

    if (window.innerWidth < 780 && switcher.getAttribute("data-mobile-scaling") === "True") {
        if (bar.classList.contains("switch__bar--right")) {
            bar.style.width = right[0].clientWidth ? `${right[0].clientWidth}px` : `${right[1].clientWidth}px`;
        } else {
            bar.style.width = left[0].clientWidth ? `${left[0].clientWidth}px` : `${left[1].clientWidth}px`;
        }
    }

    leftContent.classList.toggle(leftContentName + "--hidden");
    rightContent.classList.toggle(rightContentName + "--hidden");
}


function scaleSwitcherBar() {
    if (window.innerWidth < 780) {
        let switchers = document.querySelectorAll(".switcher")
        switchers.forEach(x => {
            let left = x.querySelectorAll(".switcher__left-block-title");
            let right = x.querySelectorAll(".switcher__right-block-title");
            if (x.getAttribute("data-mobile-scaling") === "True") {
                let bar = x.querySelector(".switch__bar");
                if (bar.classList.contains("switch__bar--right")) {
                    bar.style.width = right[0].clientWidth ? `${right[0].clientWidth}px` : `${right[1].clientWidth}px`;
                } else {
                    bar.style.width = left[0].clientWidth ? `${left[0].clientWidth}px` : `${left[1].clientWidth}px`;
                }
            }
        });
    }
    else {
        let bar = document.querySelectorAll(".switch__bar");
        bar.forEach(x => x.style.width = "50%");
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


let openedMapCitiesList = null;
function clearOpenedMapCitiesList() {
    if (openedMapCitiesList) {
        openedMapCitiesList.classList.remove("buy-map__button-container--active");
        openedMapCitiesList = null;
    }
}

function toggleMapCitiesList(event) {
    if (event.target.classList.contains("buy-map__cities-menu")) {
        return 0;
    }
    let closestButton = event.target.closest("button");
    if (closestButton === null) {
        clearOpenedMapCitiesList();
    }
    else if (!closestButton.parentElement.classList.contains("buy-map__button-container")) {
        clearOpenedMapCitiesList();
    }
    else {
        if (closestButton.parentElement.classList.contains("buy-map__button-container--active")) {
            clearOpenedMapCitiesList();
        } else {
            clearOpenedMapCitiesList();
            closestButton.parentElement.classList.add("buy-map__button-container--active");
            openedMapCitiesList = event.target.closest("button").parentElement;
        }
    }
}

let cities = {
    "moscow": {center: [55.754187615820115, 37.62089137036133], defaultZoom: 10, addresses: [{id: 0, title: "г. Москва, Открытое ш., д. 2 к.12", desc: "м.Бульвар Рокоссовского<br/> +7 (495) 215-52-15<br/> Пн-Пт: 08:00-22:00; Сб-Вс: 09:00-21:00;", geo: [55.80690906892925, 37.72763399999997]}, {id: 1, title: "г. Москва, ул. Воронцовская, д. 48", desc: "м. Пролетарская<br/> +7 (495) 215-52-15<br/> Пн-Пт: 08:00-21:00; Сб-Вс: 09:00-21:00;", geo: [55.73258056900649, 37.66372749999994]}, {id: 2, title: "г. Москва, ул. Парковая 3-я, д. 8/19", desc: "м. Измайловская<br/> +7 (495) 215-52-15<br/> Пн-Пт: 08:00-21:00; Сб-Вс: 09:00-21:00;", geo: [55.79062006894706, 37.784389499999904]}, {id: 3, title: "г. Москва, Зелёный пр-кт, д. 8", desc: "м. Перово<br/>+7 (495) 215-52-15<br>Пн-Вс: 09:00-21:00;", geo: [55.74870556898838, 37.77709499999995]}]},
    "alexandrov": {center: [56.391917191830295, 38.719958], defaultZoom: 13, addresses: [{id: 0, title: "ВО, г. Александров, ул. Терешковой, д. 6", desc: "+7 (492) 222-24-96<br/>Пн-Вс: 08:00-20:00;", geo: [56.38085156833993, 38.71378649999998]}, {id: 1, title: "г. Александров, ул. Ленина, д. 13 к. 1", desc: "+7 (492) 222-24-96<br/>Пн-Вс: 09:00-21:00;", geo: [56.39838656832499, 38.71755049999995]}, {id: 2, title: "ВО, г. Александров, ул. Ленина, д. 26", desc: "+7 (492) 222-24-96<br/>Пн-Вс: 08:00-21:00;", geo: [56.39732506835228, 38.71968849999998]}]}
}

function createMapPoint(id, title, desc) {
    return `<li><button class="buy-map__point-button" data-address-id=${id}><div class="buy-map__address-title">${title}</div><div class="buy-map__address-desc">${desc}</div></button></li>`;
}

function choiceCityMap(event) {
    let buyMapContainer = event.target.closest(".template-container");
    let title = buyMapContainer.querySelector(".buy-map__city-name");

    if (title.textContent !== event.target.textContent) {
        title.textContent = event.target.textContent;
        let mapPoints = buyMapContainer.querySelector(".buy-map__map-points ul");
        let newMapPoints = "";
        
        for (let address of cities[event.target.getAttribute("for")].addresses) {
            newMapPoints += createMapPoint(address.id, address.title, address.desc);
        }
        mapPoints.innerHTML = newMapPoints;
    }
}


let mapCitiesSimpleBars = [];
let mapAddressesSimpleBars = [];
document.querySelectorAll('.buy-map__scroll-points').forEach(x => mapAddressesSimpleBars.push(new SimpleBar(x, {autoHide: false})));
document.querySelectorAll('.buy-map__scroll-cities').forEach(x => mapCitiesSimpleBars.push(new SimpleBar(x, {autoHide: false})));
document.querySelectorAll(".mobile-modal-menu__body").forEach(x => new SimpleBar(x, {autoHide: false}));


function createPlacemarks(addresses) {
    let placemarks = {};
    for (let address of addresses) {
        placemarks[address.id] = new ymaps.Placemark(address.geo, {
            balloonContentHeader: address.title,
            balloonContentBody: address.desc,
        }, {});
    }
    return placemarks;
}

let needToResize = true;
let map;
function initMaps() {
    let currentCity = Object.keys(cities)[0];
    map = new ymaps.Map("ya-map", {
        center: cities[currentCity].center,
        zoom: cities[currentCity].defaultZoom,
    });
    let placemarks, clusterer, currentPointButton;

    function showCityMarkers(event=null) {
        if (event) {
            let chosenCity = event.target.getAttribute("for");
            if (currentCity === chosenCity) {
                return;
            }
            currentCity = chosenCity;
            map.geoObjects.removeAll();
            map.setCenter(cities[currentCity].center, cities[currentCity].defaultZoom);
            addButtonsListeners();
        }
        placemarks = createPlacemarks(cities[currentCity].addresses);
        clusterer = new ymaps.Clusterer({
            groupByCoordinates: false,
        });
        map.geoObjects.add(clusterer);
        for (let placemarkId in placemarks) {
            map.geoObjects.add(placemarks[placemarkId]);
            clusterer.add(placemarks[placemarkId]);
        }
    }

    function zoomPlacemark(event) {
        let button = event.target.closest("button");
        let id = button.getAttribute("data-address-id");
        let buyMap = event.target.closest(".buy-map");
        buyMap.querySelector(".switcher__right-block-title").click();
        if (currentPointButton) {
            currentPointButton.classList.remove("buy-map__point-button--active");
        }
        button.classList.add("buy-map__point-button--active");
        currentPointButton = button;
        map.setCenter(placemarks[id].geometry.getCoordinates(), 15);
        placemarks[id].balloon.open();
    }

    function addButtonsListeners() {
        document.querySelectorAll(".buy-map__map-points ul li button").forEach(x => x.addEventListener("click", zoomPlacemark));
    }
    showCityMarkers();
    addButtonsListeners();
    document.querySelectorAll(".buy-map__cities-menu label").forEach(x => x.addEventListener("click", showCityMarkers));
}
function reInitMap() {
    if (needToResize) {
        map.destroy();
        ymaps.ready(initMaps);
        needToResize = false;
    }
}

if (document.querySelector("#ya-map")) {
    ymaps.ready(initMaps);
}

function bodyFixPosition() {
    setTimeout( function() {
      if ( !document.body.hasAttribute('modal-opened') ) {
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        let scrollWidth = window.innerWidth - document.body.clientWidth;
        document.body.setAttribute('modal-opened', scrollPosition);
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.paddingRight = scrollWidth + 'px';
        document.querySelector(".header").style.paddingRight = scrollWidth + 'px';
        document.querySelector(".mobile-fixed-menu").style.paddingRight = scrollWidth + 'px';
        document.body.style.top = '-' + scrollPosition + 'px';
        document.body.style.left = '0';
        document.body.style.width = '100%';
      }
    }, 15 );
}
function bodyUnfixPosition() {
    if ( document.body.hasAttribute('modal-opened') ) {
        let scrollPosition = document.body.getAttribute('modal-opened');
        document.body.removeAttribute('modal-opened');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.paddingRight = '';
        document.querySelector(".header").style.paddingRight = '';
        document.querySelector(".mobile-fixed-menu").style.paddingRight = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        window.scroll(0, scrollPosition);
    }
}


function openMobileModalMenuSubList() {
    let menu = this.closest(".mobile-modal-menu")
    let openedList = this.parentElement.querySelector("ul");
    if (!menu.classList.contains("mobile-modal-menu--sub-list")) menu.classList.add("mobile-modal-menu--sub-list");
    openedList.style.display = "block";
    if (openedList.classList.contains("_no-footer")) {
        menu.classList.add("_no-footer")
    }
    this.parentElement.parentElement.classList.add("mobile-modal-menu__opened-sub-list")
    this.parentElement.classList.add("mobile-modal-menu__opened-sub-list");
}
function closeMobileModalMenuSubList() {
    let menu = this.closest(".mobile-modal-menu");
    let openedLists = menu.querySelectorAll("li.mobile-modal-menu__opened-sub-list");
    if (openedLists.length == 1) menu.classList.remove("mobile-modal-menu--sub-list");
    let checkedList = openedLists[openedLists.length - 1].querySelector("ul")
    if (checkedList.classList.contains("_no-footer")) {
        menu.classList.remove("_no-footer");
    }
    openedLists[openedLists.length - 1].classList.remove("mobile-modal-menu__opened-sub-list");
    openedLists[openedLists.length - 1].querySelector("ul").style.display = "none";
}
function openModal(modal) {
    bodyFixPosition();
    modal.classList.add("modal--visible");
    modal.addEventListener("click", closeModal);
}
function closeModal(event) {
    let modal = event.target.closest(".modal--visible");
    if (event.target === modal || this.classList.contains("mobile-modal-menu__close")) {
        modal.classList.remove("modal--visible");
        modal.removeEventListener("click", closeModal);
        setTimeout(() => {
            bodyUnfixPosition();
        }, mainDelay);
    }
}
function openMobileModalMenu() {
    let modal = document.querySelector(".mobile-modal-menu")
    openModal(modal);
}
function clearTextInputError(event) {
    this.parentElement.querySelector(".input-text__input").classList.remove("input-text__input--error");
    this.closest(".form__item").classList.remove("form__item--error");
}
function clearTextareaError(event) {
    this.parentElement.querySelector(".textarea__textarea").classList.remove("textarea__textarea--error");
    this.closest(".form__item").classList.remove("form__item--error");
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".input-text__icon").forEach(x => {
        x.addEventListener("click", clearTextInputError);
    });
    document.querySelectorAll(".textarea__icon").forEach(x => {
        x.addEventListener("click", clearTextareaError);
    });
});
document.querySelectorAll(".mobile-modal-menu__close-sub-list").forEach(x => x.addEventListener("click", closeMobileModalMenuSubList));
document.querySelectorAll(".mobile-modal-menu__body li a + ul").forEach(x => {
    x.parentElement.querySelector("a").addEventListener("click", openMobileModalMenuSubList);
});
document.querySelectorAll(".mobile-modal-menu__close").forEach(x => x.addEventListener("click", closeModal));
document.querySelectorAll(".mobile-fixed-menu__modal-button").forEach(x => x.addEventListener("click", openMobileModalMenu));
document.querySelectorAll(".mobile-modal-menu__open-search").forEach(x => x.addEventListener("click", function() {
    this.closest(".mobile-modal-menu__header").classList.add("mobile-modal-menu__header--search");
}));
document.querySelectorAll(".mobile-modal-menu__close-search").forEach(x => x.addEventListener("click", function() {
    this.closest(".mobile-modal-menu__header").classList.remove("mobile-modal-menu__header--search");
}));
document.querySelectorAll(".search-input input").forEach(x => {
    x.addEventListener("focus", function(event) {
        event.target.closest(".search-input").classList.add("search-input--active");
        this.placeholder = this.getAttribute("data-focus-placeholder");
    });
    
    x.addEventListener("blur", function(event) {
        if (event.relatedTarget !== this.closest(".input-text").querySelector(".input-text__reset")) {
            event.target.closest(".search-input").classList.remove("search-input--active");
            this.placeholder = this.getAttribute("data-default-placeholder");
        } else {
            this.focus()
        }
    });
});
document.querySelectorAll(".header-bottom__close-icon").forEach(x => x.addEventListener("click", function(event) {
    event.target.closest(".header-bottom").classList.remove("header-bottom--search");
}));
document.querySelectorAll(".header-bottom__search-icon").forEach(x => x.addEventListener("click", function(event) {
    event.target.closest(".header-bottom").classList.add("header-bottom--search");
}));
const switchBarContainer = document.querySelectorAll(".switch__bar-container");
switchBarContainer.forEach(x => x.addEventListener("click", moveSwitcher));
const articlesCategListingContentLabel = document.querySelectorAll(".articles-categ-listing__content label");
articlesCategListingContentLabel.forEach(x => {x.addEventListener("click", choiceArticle)});
document.addEventListener("click", docOnClick)
document.addEventListener("DOMContentLoaded", event => {
    scaleSwitcherBar(event);
});
window.addEventListener("scroll", (event) => {
    fixHeader(event);
});
window.addEventListener("resize", (event) => {
    scaleSwitcherBar(event);
    if (window.innerWidth < 1024) {
        reInitMap(event);
    } else {
        needToResize = true;
    }
});
const switcherLeftBlockTitle = document.querySelectorAll(".switcher__left-block-title");
switcherLeftBlockTitle.forEach(x => x.addEventListener("click", moveSwitcher));
const switcherRightBlockTitle = document.querySelectorAll(".switcher__right-block-title");
switcherRightBlockTitle.forEach(x => x.addEventListener("click", moveSwitcher));
const mapCitiesBlocks = document.querySelectorAll(".buy-map__cities-menu label");
mapCitiesBlocks.forEach(x => x.addEventListener("click", choiceCityMap));
