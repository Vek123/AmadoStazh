let tableScrollBars = [
    new SimpleBar(document.querySelector('.table-container__table', {})),
    new SimpleBar(document.querySelector('.table-container__topscroll', {}))
]
tableScrollBars[0].getScrollElement().addEventListener('scroll', function() {
    tableScrollBars[1].getScrollElement().scroll({left: tableScrollBars[0].getScrollElement().scrollLeft});
});
tableScrollBars[1].getScrollElement().addEventListener('scroll', function() {
    tableScrollBars[0].getScrollElement().scroll({left: tableScrollBars[1].getScrollElement().scrollLeft});
});
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) {
        document.querySelector('.table-container__fake').style.cssText += `width: ${document.querySelector('.table-container__table table').clientWidth}px;`;
    }
})