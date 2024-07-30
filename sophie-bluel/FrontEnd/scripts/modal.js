//récuperer le token
let token;
if (window.localStorage.getItem('userData')) {
    token = JSON.parse(window.localStorage.getItem("userData")).token;
}
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

let modal = null

const closeModal = function (event) {
    if (modal === null) return;
    event.preventDefault();
    modal.setAttribute('style','display:none');
    modal.setAttribute('aria-hidden', 'true');
}
const openModal1 = function (event) {
    event.preventDefault();
    const target = document.getElementById('modal1');
    target.removeAttribute('style','display:none');
    target.removeAttribute('aria-hidden')
    modal = target;
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
}

//Appel de la fonction openModal au moment du clique sur 'modifier'
document.querySelector('.js-modal').addEventListener('click', openModal1);

//quitter la modale avec le bouton échap du clavier
window.addEventListener('keydown', function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event)
    }
})

//création div pour les photos
const modalContainer = document.querySelector('.modal-container1');
const imageContainer = document.createElement('div');
imageContainer.classList.add('img-container');
modalContainer.appendChild(imageContainer);


//boucle pour ajouter les photos
for (let i = 0; i < works.length; i++) {
    let figure = document.createElement('figure');
    figure.classList.add('modal1-figure');
    let figImage = document.createElement('img');
    figImage.classList.add('modal-images');
    figImage.src = works[i].imageUrl;
    figImage.alt = works[i].title;
    
    imageContainer.appendChild(figure);
    figure.appendChild(figImage)

    //icone pour supprimer les photos
    let deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class','fa-solid fa-trash-can');
    deleteIcon.classList.add('cursor');
    figure.appendChild(deleteIcon)
}

let deleteIcon = document.querySelector('.fa-trash-can')
    

//supprimer photos
deleteIcon.addEventListener('click', function (event) {
    event.preventDefault();
    //manque qqlchose ici
    let workID = works[i].id; 
    fetch('http://localhost:5678/api/works/${workID}', {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                "accept": "*/*",
                "Authorization": `Bearer ${token}`
              }
        },
    )
    .then(response => response.json())
})

//bouton-lien 'ajouter une photo' (mène à la modale 'ajout photo')
const addPhotoSection = document.createElement('div');
addPhotoSection.innerHTML = `<hr>
		<a href="" class="modalBtn">
			Ajouter une photo
		</a>`;
modalContainer.appendChild(addPhotoSection);

//modale 'ajout photo'
const openModal2 = function (event) {
    event.preventDefault();
    const target = document.getElementById('modal2');
    target.removeAttribute('style','display:none');
    target.removeAttribute('aria-hidden');
    modal = target;
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
}

//ouverture de la modale 'ajout photo' avec le clique sur le btn
let addPhotoBtn = document.querySelector('.modalBtn');
addPhotoBtn.addEventListener('click', function () {
    openModal2()
})

