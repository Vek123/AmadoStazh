function closeAccordions(event) {
    
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordions-list--only-one").forEach(x => {
        x.querySelectorAll(".accordion__input").forEach(y => {
            y.addEventListener("change", (event) => {
                let opened = x.querySelectorAll(".accordion__input:checked");
                if (opened.length > 1) {
                    opened.forEach(z => {
                        z.checked = false;
                    })
                    event.target.checked = true;
                }
            })
        })
    })
});