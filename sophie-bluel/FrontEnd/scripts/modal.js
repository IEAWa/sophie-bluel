const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

let modal = null

const closeModal = function (event) {
    if (modal === null) return;
    event.preventDefault();
    modal.setAttribute('style','display:none');
    modal.setAttribute('aria-hidden', 'true');
    modal = null;
}
const openModal = function (event) {
    event.preventDefault();
    const target = document.getElementById('modal1');
    target.removeAttribute('style','display:none');
    target.removeAttribute('aria-hidden')
    modal = target;
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
}


//Appel de la fonction openModal au moment du clique sur 'modifier'
document.querySelector('.js-modal').addEventListener('click', openModal);


window.addEventListener('keydown', function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event)
    }
})

import { generateWorks } from "./portfolio.js";
const modalContainer = document.querySelector('modal-container');

