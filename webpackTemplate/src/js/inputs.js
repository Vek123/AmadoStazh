import SimpleBar from 'simplebar';

function openSelectList() {
    this.parentElement.classList.toggle("select--list");
}
function choiceSelectItem(event, selectEl) {
    selectEl.classList.remove("select--list");
    selectEl.querySelector(".select__item--selected").classList.remove("select__item--selected");
    event.target.classList.add("select__item--selected");
    selectEl.querySelector(".select__input").setAttribute("value", event.target.getAttribute("data-value"));
    selectEl.querySelector(".select__label").textContent = event.target.textContent;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".select").forEach(x => {
        new SimpleBar(x.querySelector(".select__list"), {autoHide: false});
        x.querySelector(".select__output").addEventListener("click", openSelectList);
        x.querySelectorAll(".select__item").forEach(y => y.addEventListener("click", (event) => choiceSelectItem(event, x)));
    });
});