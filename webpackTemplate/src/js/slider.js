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
const medicinesSwiper = new Swiper('.cards-swiper', {
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    pagination: {
        el: '.cards-swiper .swiper-pagination',
        clickable: true,
        bulletClass: 'cards-swiper__bullet',
        bulletActiveClass: 'cards-swiper__bullet--active',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        300: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            pagination: {
                enabled: true,
                dynamicBullets: true,
                dynamicMainBullets: 1,
            },
        },
        1280: {
            spaceBetween: 20,
            slidesPerView: 4,
            pagination: {
                enabled: false,
            },
        },
        1601: {
            slidesPerView: 4,
            spaceBetween: 20,
            pagination: {
                enabled: false,
            },
        }
    }
});

export { iconsSwipers, medicinesSwiper };