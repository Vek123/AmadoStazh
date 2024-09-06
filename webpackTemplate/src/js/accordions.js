// Гипербалическая функция расчёта времени анимации, где h - высота блока, t - время анимации, k - коэффициент скорости
// t = k / (h / 100) + 1
const k = 20;
function openAccordion(accordion) {
    let content = accordion.querySelector(".accordion__content");
    let height = content.scrollHeight;
    let iter = 0;
    if (accordion.closing) {
        if (content.style.height !== "0") {
            iter = Number(content.style.height.slice(0, -2));
        }
        clearInterval(accordion.closing);
    }
    accordion.opening = setInterval(() => {
        if (iter >= height) {
            clearInterval(accordion.opening);
            content.style.height = "auto";
        } else {
            content.style.height = iter + "px";
        }
        iter += 3;
    }, k / (height / 100) + 1);
};
function closeAccordion(accordion) {
    let content = accordion.querySelector(".accordion__content");
    let iter = content.scrollHeight;
    if (accordion.opening) {
        if (content.style.height !== "auto") {
            iter = Number(content.style.height.slice(0, -2));
        }
        clearInterval(accordion.opening);
    }
    accordion.closing = setInterval(() => {
        if (iter <= 0) {
            content.style.height = "0px";
            clearInterval(accordion.closing);
        } else {
            content.style.height = iter + "px";
        }
        iter -= 3;
    }, k / (content.scrollHeight / 100) + 1);
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion__input").forEach(x => {
        let accordion = x.closest(".accordion");
        x.addEventListener("change", event => {
            if (event.target.checked) {
                openAccordion(accordion);
            } else {
                closeAccordion(accordion);
            }
        });
    });
    document.querySelectorAll(".accordions-list--only-one").forEach(x => {
        x.querySelectorAll(".accordion__input").forEach(y => {
            y.addEventListener("change", (event) => {
                let opened = x.querySelectorAll(".accordion__input:checked");
                if (opened.length > 1) {
                    opened.forEach(z => {
                        if (z !== event.target) {
                            z.checked = false;
                            closeAccordion(z.closest(".accordion"));
                        }
                    })
                }
            })
        })
    })
});