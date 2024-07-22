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
                bulletClass: 'medicament-list__bullet',
                bulletActiveClass: 'medicament-list__bullet--active',
                dynamicBullets: true,
                dynamicMainBullets: 1,
            },
            navigation: {
                nextEl: [swiper.parentElement.querySelectorAll('.medicament-list__button--next')[0], swiper.parentElement.querySelectorAll('.medicament-list__button--next')[1]],
                prevEl: [swiper.parentElement.querySelectorAll('.medicament-list__button--prev')[0], swiper.parentElement.querySelectorAll('.medicament-list__button--prev')[1]],
                disabledClass: 'medicament-list__button--disabled',
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
export { iconsSwipers, medicinesSwipers };