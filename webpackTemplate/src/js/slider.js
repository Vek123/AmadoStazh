import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

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
iconsSwipers.slideTo(Math.floor((iconsSwipers.slides.length - 1) / 2));
// if (iconsSwipers?.length) {
//   for (sw of iconsSwipers) {
//     sw.slideTo(Math.floor((sw.slides.length - 1) / 2));
//   }
// }

export { iconsSwipers };