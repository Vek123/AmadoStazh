let moveTopScroll = () => {
    let topscroll = document.querySelector('.table-container__topscroll');
    topscroll.scroll({left: document.querySelector('.table-container__table').scrollLeft});
};
let moveMainScroll = () => {
    let mainScroll = document.querySelector('.table-container__table');
    mainScroll.scroll({left: document.querySelector('.table-container__topscroll').scrollLeft});
};
let showAllSameArticles = () => {
    document.querySelectorAll('.same-articles__list li:nth-child(n+3)').forEach(x => x.style.display = 'block');
    document.querySelector('.same-articles__button-show-all').style.cssText += 'display: none!important;';
};
let showMobileFixedMenu = () => {
    document.querySelectorAll('.mobile-menu-fixed .fixed-menu').forEach(x => x.classList.remove('fixed-menu_hidden'));
    document.querySelectorAll('.mobile-menu-fixed .fixed-menu__container').forEach(x => x.classList.remove('fixed-menu__container_hidden'));
};
let closeFixedMenu = () => {
    document.querySelectorAll('.fixed-menu').forEach(x => x.classList.add('fixed-menu_hidden'));
    document.querySelectorAll('.fixed-menu__container').forEach(x => x.classList.add('fixed-menu__container_hidden'));
};
window.addEventListener('scroll', function() {
    if (window.scrollY >= document.querySelector('.header-top').clientHeight && !this.document.querySelector('body').classList.contains('modal-opened')) {
        this.document.querySelector('.header-fixed').style.display = 'block';
    } else if (this.window.screen.width > 370) {
        this.document.querySelector('.header-fixed').style.display = 'none';
    }
});