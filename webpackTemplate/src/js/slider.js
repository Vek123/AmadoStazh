import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';


Swiper.use([Navigation, Pagination]);
const iconsSwipers = new Swiper('.medicament-card__icons-swiper', {
  nested: true,
  slidesPerView: 1,
  pagination: {
    el: '.medicament-card__icons-swiper .swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'medicament-card__bullet',
    bulletActiveClass: 'medicament-card__bullet--active',
  },
});
const medicinesSwiper = new Swiper('.medicament-list__swiper', {
    containerModifierClass: 'swiper-horizontal-container',
    slidesPerView: 'auto',
    spaceBetween: 10,
    pagination: {
        el: '.medicament-list__swiper-pagination',
        horizontalClass: 'medicament-list__swiper-pagination',
        clickable: true,
        enabled: true,
        bulletClass: 'medicament-list__bullet',
        bulletActiveClass: 'medicament-list__bullet--active',
        dynamicBullets: true,
        dynamicMainBullets: 1,
    },
    navigation: {
        nextEl: '.medicament-list__button--next',
        prevEl: '.medicament-list__button--prev',
        disabledClass: 'medicament-list__button--disabled',
    },
    breakpoints: {
        1280: {
            spaceBetween: 20,
            slidesPerView: 4,
        }
    }
});

export { iconsSwipers, medicinesSwiper };