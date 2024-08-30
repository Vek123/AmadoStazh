import SimpleBar from 'simplebar';

function closeInput(event) {
    closeSelectList(event);
}

function closeSelectList(event) {
    let select = event.target.closest(".select");
    if (!openedList) {
        return;
    }
    if (!select) {
        openedList.classList.remove("select--list");
        openedList = null;
    }
}
let openedList = null;
function openSelectList() {
    if (this.parentElement.classList.contains("select--list")) {
        this.parentElement.classList.remove("select--list");
        openedList = null;
    } else if (openedList) {
        openedList.classList.remove("select--list");
        this.parentElement.classList.add("select--list");
        openedList = this.parentElement;
    } else {
        this.parentElement.classList.add("select--list");
        openedList = this.parentElement;
    }
}
function choiceSelectItem(event, selectEl) {
    selectEl.classList.remove("select--list");
    selectEl.querySelector(".select__item--selected").classList.remove("select__item--selected");
    event.target.classList.add("select__item--selected");
    selectEl.querySelector(".select__input").setAttribute("value", event.target.getAttribute("data-value"));
    selectEl.querySelector(".select__label").textContent = event.target.textContent;
}
document.addEventListener("click", closeInput);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".select").forEach(x => {
        new SimpleBar(x.querySelector(".select__list"), {autoHide: false});
        x.querySelector(".select__output").addEventListener("click", openSelectList);
        x.querySelectorAll(".select__item").forEach(y => y.addEventListener("click", (event) => choiceSelectItem(event, x)));
    });
});