import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';


Swiper.use([Navigation, Pagination, EffectFade]);
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
let medicinesSwipers = [];
document.querySelectorAll(".medicament-list__swiper").forEach(swiper => {
    medicinesSwipers.push(
        new Swiper(swiper, {
            containerModifierClass: 'swiper-horizontal-container',
            slidesPerView: 'auto',
            spaceBetween: 10,
            pagination: {
                el: swiper.querySelector('.medicament-list__swiper-pagination'),
                horizontalClass: 'medicament-list__swiper-pagination',
                clickable: true,
                enabled: true,
                bulletClass: 'swiper__gray-bullet',
                bulletActiveClass: 'swiper__gray-bullet--active',
                dynamicBullets: true,
                dynamicMainBullets: 1,
            },
            navigation: {
                nextEl: [swiper.parentElement.querySelectorAll('.medicament-list__button--next')[0], swiper.parentElement.querySelectorAll('.medicament-list__button--next')[1]],
                prevEl: [swiper.parentElement.querySelectorAll('.medicament-list__button--prev')[0], swiper.parentElement.querySelectorAll('.medicament-list__button--prev')[1]],
                disabledClass: 'swiper__navigation--disabled',
            },
            breakpoints: {
                1280: {
                    spaceBetween: 20,
                    slidesPerView: 4,
                }
            }
        })
    );
})

let bannerSwipers = [];
document.querySelectorAll(".banner-slider__swiper").forEach(swiper => {
    bannerSwipers.push(
        new Swiper(swiper, {
            spaceBetween: 30,
            effect: "fade",
            fadeEffect: { crossFade: true },
            slidesPerView: 1,
            pagination: {
                el: swiper.querySelector('.banner-slider__pagination'),
                horizontalClass: 'banner-slider__pagination',
                clickable: true,
                bulletClass: 'swiper__gray-bullet',
                bulletActiveClass: 'swiper__gray-bullet--active',
            },
            navigation: {
                nextEl: [swiper.querySelectorAll('.banner-slider__button--next')[0], swiper.querySelectorAll('.banner-slider__button--next')[1]],
                prevEl: [swiper.querySelectorAll('.banner-slider__button--prev')[0], swiper.querySelectorAll('.banner-slider__button--prev')[1]],
                disabledClass: 'swiper__navigation--disabled',
            }
        })
    );
})

let bigCardsSwipers = [];
document.querySelectorAll(".big-cards-list__swiper").forEach(swiper => {
    bigCardsSwipers.push(
        new Swiper(swiper, {
            spaceBetween: 30,
            slidesPerView: 1,
            pagination: {
                el: swiper.querySelector(".big-cards-list__pagination"),
                horizontalClass: "big-cards-list__pagination",
                clickable: true,
                bulletClass: 'swiper__gray-bullet',
                bulletActiveClass: 'swiper__gray-bullet--active',
                dynamicBullets: true,
                dynamicMainBullets: 1,
            },
            navigation: {
                nextEl: [swiper.querySelectorAll('.big-cards-list__nav-button--next')[0], swiper.querySelectorAll('.big-cards-list__nav-button--next')[1]],
                prevEl: [swiper.querySelectorAll('.big-cards-list__nav-button--prev')[0], swiper.querySelectorAll('.big-cards-list__nav-button--prev')[1]],
                disabledClass: 'swiper__navigation--disabled',
            }
        })
    );
})

export { iconsSwipers, medicinesSwipers, bannerSwipers };