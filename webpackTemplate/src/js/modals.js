const mainDelay = 300;


function bodyFixPosition() {
    setTimeout( function() {
      if ( !document.body.hasAttribute('modal-opened') ) {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        document.body.setAttribute('modal-opened', scrollPosition);
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = '-' + scrollPosition + 'px';
        document.body.style.left = '0';
        document.body.style.width = '100%';
      }
    }, 15 );
}
function bodyUnfixPosition() {
    if ( document.body.hasAttribute('modal-opened') ) {
        let scrollPosition = document.body.getAttribute('modal-opened');
        document.body.removeAttribute('modal-opened');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        window.scroll(0, scrollPosition);
    }
}
function openModal(modal) {
    bodyFixPosition();
    modal.classList.add("modal--visible");
    modal.addEventListener("click", closeModal);
}
function closeModal(event) {
    let modal = event.target.closest(".modal--visible");
    if (event.target === modal || this.classList.contains("modal__close-button")) {
        modal.classList.remove("modal--visible");
        modal.removeEventListener("click", closeModal);
        setTimeout(() => {
            bodyUnfixPosition();
        }, mainDelay);
    }
}

function openFeedbackModal() {
    let modal = document.querySelector(".feedback-modal-form");
    openModal(modal);
}
let closedModal = null;
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modal__close-button").forEach(x => x.addEventListener("click", closeModal));

    document.querySelectorAll(".open-feedback-modal").forEach(x => x.addEventListener("click", openFeedbackModal));
    document.querySelectorAll(".feedback-modal__success-button").forEach(x => x.addEventListener("click", event => {
        event.target.closest(".feedback-modal").classList.remove("feedback-modal--success");
    }));
});