const medicinesSwiper = new Swiper('.article-medicaments__items-swiper', {
    observer: true,
    observeParents: true,
    spaceBetween: 10,
    pagination: {
        el: '.article-medicaments__items-swiper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.article-medicaments__items-swiper .swiper-button-next',
        prevEl: '.article-medicaments__items-swiper .swiper-button-prev',
    },
    breakpoints: {
        300: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            pagination: {
                enabled: true,
            },
        },
        1025: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            pagination: {
                enabled: false,
            },
        },
        1280: {
            spaceBetween: 30,
            slidesPerView: 4,
            pagination: {
                enabled: false,
            },
        },
        1601: {
            slidesPerView: 4,
            spaceBetween: 40,
            pagination: {
                enabled: false,
            },
        }
    }
});
const iconsSwipers = new Swiper('.item-icons-swiper', {
    nested: true,
    pagination: {
        el: '.item-icons-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    }
});
for (sw of iconsSwipers) {
    sw.slideTo(Math.floor((sw.slides.length - 1) / 2));
}
let zoomedSwipers = [];
document.querySelectorAll('.zoomed-images').forEach(sw => {
    zoomedSwipers.push(new Swiper(`.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper`, {
        enabled: false,
        spaceBetween: 10,
        zoom: true,
        keyboard: {
            enabled: true,
        },
        navigation: {
            nextEl: `.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper .swiper-button-next`,
            prevEl: `.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper .swiper-button-prev`,
        },
        pagination: {
            el: `.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper .swiper-pagination`,
            type: 'fraction',
        },
        on: {
            init: function(swiper) {
                document.querySelectorAll(`.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper .swiper-slide .zoom-image-icon`).forEach(x => {
                    x.addEventListener('click', () => {
                        document.querySelectorAll(`.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper .swiper-slide .zoom-image-icon`).forEach(y => {
                            y.classList.add('zoom-image-icon_hidden');
                        });
                        swiper.zoom.enable();
                        swiper.zoom.in();
                    });
                });
                document.querySelectorAll(`.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper .swiper-slide`).forEach(x => {
                    x.addEventListener('dblclick', () => {
                        document.querySelectorAll(`.${sw.classList[sw.classList.length-1]} .zoomed-img-swiper .swiper-slide .zoom-image-icon`).forEach(y => {
                            y.classList.remove('zoom-image-icon_hidden');
                        });
                        swiper.zoom.disable();
                        swiper.zoom.out();
                    });
                });
            },
            keyPress: function(swiper, keyCode) {
                switch(keyCode) {
                    case 27:
                        swiper.disable();
                        closeZoomedSwiper();
                }
            },
        }
    }));
});
let showZoomedSwiper = (name) => {
    zoomedSwipers.forEach(x => x.enable());
    document.querySelector('body').classList.add('modal-opened');
    document.querySelector(`.zoomed-${name}`).style.display = 'block';
    document.querySelector('html').classList.add('modal-opened');
};
let closeZoomedSwiper = () => {
    zoomedSwipers.forEach(x => x.disable());
    document.querySelector('body').classList.remove('modal-opened');
    document.querySelector('html').classList.remove('modal-opened');
    document.querySelectorAll('.zoomed-images').forEach(x => x.style.display = 'none');
};
const sameArticlesSwiper = new Swiper('.same-articles__swiper', {
    spaceBetween: 50,
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.same-articles__swiper .swiper-button-next',
        prevEl: '.same-articles__swiper .swiper-button-prev',
    },
    pagination: {
        el: '.same-articles__swiper .swiper-pagination',
        clickable: true,
    },
    enabled: false,
    breakpoints: {
        100: {
            enabled: true,
            slidesPerView: 1,
            spaceBetween: 10,
        },
        780: {
            enabled: false,
            slidesPerView: 'auto',
            spaceBetween: 0,
        },
        1024: {
            spaceBetween: 50,
        }
    },
});
const contentImagesThumbsSwiper = new Swiper('.content-images-swiper__thumbs-swiper', {
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
});
const contentImagesSwiper = new Swiper('.content-images-swiper', {
    spaceBetween: 10,
    navigation: {
        nextEl: ".content-images-swiper .swiper-button-next",
        prevEl: ".content-images-swiper .swiper-button-prev",
    },
    thumbs: {
        swiper: contentImagesThumbsSwiper,
    }
});