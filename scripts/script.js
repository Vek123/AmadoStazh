let showAllSameArticles = () => {
    document.querySelectorAll('.same-articles__list li:nth-child(n+3)').forEach(x => x.style.display = 'block');
    document.querySelector('.same-articles__button-show-all').style.cssText += 'display: none!important;';
};
let showMobileFixedMenu = () => {
    document.querySelectorAll('.mobile-menu-fixed .fixed-menu').forEach(x => x.classList.remove('fixed-menu_hidden'));
    document.querySelectorAll('.mobile-menu-fixed .fixed-menu__container').forEach(x => x.classList.remove('fixed-menu__container_hidden'));
    document.querySelector('body').classList.add('modal-opened');
    document.querySelector('html').classList.add('modal-opened');
};
let closeFixedMenu = () => {
    document.querySelectorAll('.fixed-menu').forEach(x => x.classList.add('fixed-menu_hidden'));
    document.querySelectorAll('.fixed-menu__container').forEach(x => x.classList.add('fixed-menu__container_hidden'));
    document.querySelector('body').classList.remove('modal-opened');
    document.querySelector('html').classList.remove('modal-opened');
};
window.addEventListener('scroll', function() {
    if (window.scrollY >= document.querySelector('.header-top').clientHeight && !this.document.querySelector('body').classList.contains('modal-opened')) {
        this.document.querySelector('.header-fixed').style.display = 'block';
    } else if (this.window.screen.width > 370) {
        this.document.querySelector('.header-fixed').style.display = 'none';
    }
});
function bodyFixPosition() {

    setTimeout( function() {
      if ( !document.body.hasAttribute('modal-opened') ) {
  
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
        document.body.setAttribute('model-opened', scrollPosition);
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = '-' + scrollPosition + 'px';
        document.body.style.left = '0';
        document.body.style.width = '100%';
      }
    }, 15 );
  
  }
  
function bodyUnfixPosition() {

    if ( document.body.hasAttribute('model-opened') ) {
        let scrollPosition = document.body.getAttribute('modal-opened');
        document.body.removeAttribute('modal-opened');

        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';

        window.scroll(0, scrollPosition);
    }
}