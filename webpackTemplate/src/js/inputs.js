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
    if (this.closest(".select").classList.contains("select--list")) {
        this.closest(".select").classList.remove("select--list");
        openedList = null;
    } else if (openedList) {
        openedList.classList.remove("select--list");
        this.closest(".select").classList.add("select--list");
        openedList = this.parentElement;
    } else {
        this.closest(".select").classList.add("select--list");
        openedList = this.parentElement;
    }
}
function choiceSelectItem(event, selectEl) {
    selectEl.classList.remove("select--list");
    selectEl.querySelectorAll(".select__item--selected").forEach(x => x.classList.remove("select__item--selected"));
    event.target.classList.add("select__item--selected");

    let input = selectEl.querySelector(".select__input");
    input.setAttribute("value", event.target.getAttribute("data-value"));

    let label = selectEl.querySelector(".select__label");
    label.textContent = event.target.getAttribute("data-name");

    if (input.getAttribute("value") === input.getAttribute("data-default-value")) {
        selectEl.querySelector(".select__output").classList.add("select__output--default");
    } else {
        selectEl.querySelector(".select__output").classList.remove("select__output--default");
    }
    input.dispatchEvent(new Event("change"));
}
document.addEventListener("click", closeInput);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".select").forEach(x => {
        new SimpleBar(x.querySelector(".select__list"), {autoHide: false});
        x.querySelector(".select__label").addEventListener("click", openSelectList);
        x.querySelectorAll(".select__item").forEach(y => y.addEventListener("click", (event) => choiceSelectItem(event, x)));
    });
});