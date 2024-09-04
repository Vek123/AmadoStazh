import SimpleBar from 'simplebar';


function closeSelectList(event) {
    let select = event.target.closest(".select");
    if (openedList && !select) {
        openedList.classList.remove("select--list");
        openedList = null;
    }
}
let openedList = null;
function openSelectList() {
    let select = this.closest(".select");
    if (select.classList.contains("select--list")) {
        select.classList.remove("select--list");
        openedList = null;
    } else if (openedList) {
        openedList.classList.remove("select--list");
        select.classList.add("select--list");
        openedList = select;
    } else {
        select.classList.add("select--list");
        openedList = select;
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
document.addEventListener("click", closeSelectList, true);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".select").forEach(x => {
        new SimpleBar(x.querySelector(".select__list"), {autoHide: false});
        x.querySelector(".select__label").addEventListener("click", openSelectList);
        x.querySelectorAll(".select__item").forEach(y => y.addEventListener("click", (event) => choiceSelectItem(event, x)));
    });
});