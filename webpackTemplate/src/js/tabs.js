function openTab(tabs, event) {
    tabs.querySelectorAll(".tabs__link--selected").forEach(x => x.classList.remove("tabs__link--selected"));
    event.target.classList.add("tabs__link--selected");
    tabs.querySelectorAll(".tabs__tab-content--visible").forEach(x => x.classList.remove("tabs__tab-content--visible"));
    let openedTab = tabs.querySelector(`.tabs__tab-content[data-id="${event.target.getAttribute("data-id")}"]`);
    openedTab.classList.add("tabs__tab-content--visible");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tabs").forEach(x => {
        x.querySelectorAll(".tabs__link[data-id]").forEach(y => {
            y.addEventListener("click", (event) => openTab(x, event));
        });
    });
});