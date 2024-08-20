// récuperer les données du backend
const response = await fetch('http://localhost:5678/api/works');
let works = await response.json();

const apiCategories = await fetch("http://localhost:5678/api/categories");
const categories = await apiCategories.json();

//récuperer le token
let token;
if (window.localStorage.getItem('userData')) {
    token = JSON.parse(window.localStorage.getItem("userData")).token;
}

    //fonction pour fermer la modale
    const closeModal = function (event) {
        event.preventDefault();
        const firstModal = document.querySelector('.modal');
        firstModal.remove();
    }


//fonction pour générer la modale
export function generateModal(works){

    //création de la modal 1
    let modal = document.createElement('aside');
    modal.classList.add('modal');
    modal.innerHTML = `<div class="modal-container1">
                            <button class="js-close-modal">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                            <h3>Gallerie photo</h3>
                        </div>`
    const main = document.querySelector('main');
    main.appendChild(modal);

    //création div pour les photos
    const modalContainer = document.querySelector('.modal-container1');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');
    modalContainer.appendChild(imageContainer);


    //quitter la modale avec le bouton quitter
     modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
    //quitter la modale avec le bouton échap du clavier
    window.addEventListener('keydown', function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event)
        }
    })

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
        figure.appendChild(deleteIcon);       
    

     // supprimer les works
    deleteIcon.addEventListener('click', function (event) {
        event.preventDefault();
        let id = works[i].id; 
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json",
                    "accept": "",
                    "Authorization": `Bearer ${token}`
                }
            },
        )
    .then(response => { if (response.ok)
            {
            figure.remove();
            document.querySelector(`.gallery #works-${id}`).remove();
            }}
    )})
}
    //bouton-lien 'ajouter une photo' (mène à la modale 'ajout photo')
    const addPhotoSection = document.createElement('div');
    addPhotoSection.innerHTML = `<hr>
            <a href="" class="modalBtn">
                Ajouter une photo
            </a>`;
    modalContainer.appendChild(addPhotoSection);

//ouverture de la modale 'ajout photo' avec le clique sur le btn
    const addPhotoBtn = document.querySelector('.modalBtn');
    addPhotoBtn.addEventListener('click', function () {
        generateSecondModal;})
}

// Function to go back
async function goBack() {
    // Retrieve data from the backend
    const apiWorks = await fetch("http://localhost:5678/api/works");
    const works = await apiWorks.json();
    closeModal;
    generateModal(works);
  }
  goBack();

function generateSecondModal() {
    //création de la modale 2
    const modal = document.querySelector('aside');
    const modal1 = document.querySelector('.modal-container1');
    modal1.style.display='none';
    const modalContainer2 = document.createElement('div');
    modalContainer2.classList.add('modal-container2');
    modalContainer2.innerHTML = `<button class="js-close-modal">
                                <i class="fa-solid fa-xmark"></i>
                        </button>`
    const main = document.querySelector('main');
    main.appendChild(modal);
    modal.appendChild(modalContainer2);
    //contenu de la modale
    const form = document.createElement("form");
    form.action = "http://localhost:5678/api/works";
    form.method = "post";
    form.id = "form";
    form.innerHTML = `
      <div class="modal-files">
        <i class="fa-regular fa-image"></i>
        <label for="image" id="add-file">+ Ajouter photo</label>
        <input type="file" name="image" id="image" class="hidden">
        <p>jpg, png : 4mo max</p>
      </div>
      <label for="title">Titre</label>
      <input type="text" name="title" id="title" required>
      <p id="too-short"></p>
      <label for="category" id="category">Catégorie</label>
      <select name="category" id="category-select" required>
      <select/>
      <p id="error-message"></p>
      <div class="modal-btn">
        <input type="submit" value="Valider" id="submit" class="submit-btn" disabled>
      </div>`;
      modalContainer2.appendChild(form);

    //quitter la modale
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
}
