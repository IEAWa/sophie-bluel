// récuperer les données de l'API
const response = await fetch('http://localhost:5678/api/works');
let works = await response.json();
const apiCategories = await fetch("http://localhost:5678/api/categories");
const categories = await apiCategories.json();

//récuperer le token
let token;
if (localStorage.getItem('userData')) {
    token = JSON.parse(localStorage.getItem("userData")).token;
}

//fonction pour fermer la modale
function closeModal() {
    const Modal = document.querySelector('.modal');
    Modal.remove();
}

//fonction pour générer la modale
export function generateModal(works){
    //création de la modale 1
        let modal = document.createElement('aside');
        modal.classList.add('modal');
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-container');
        modalContent.innerHTML= `<button class="js-close-modal"><i class="fa-solid fa-xmark"></i></button>
        <h3>Gallerie photo</h3>`;
        const modalWorks = document.createElement('div');
        modalWorks.classList.add('img-container');

        const main = document.querySelector('main');
        main.appendChild(modal);
        modal.appendChild(modalContent);

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
        figure.id = `works-${works[i].id}`;
        figure.classList.add('modal1-figure');
        let figImage = document.createElement('img');
        figImage.classList.add('modal-images');
        figImage.src = works[i].imageUrl;
        figImage.alt = works[i].title;
        
        modalWorks.appendChild(figure);
        figure.appendChild(figImage)

        //icone pour supprimer les photos
        let deleteIcon = document.createElement('i');
        deleteIcon.setAttribute('class','fa-solid fa-trash-can');
        deleteIcon.classList.add('cursor');
        figure.appendChild(deleteIcon);  

     // supprimer les works
    deleteIcon.addEventListener('click', function (event) {
    let id = works[i].id; 
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                "accept": "",
                "Authorization": `Bearer ${token}`
                }
    })
    .then(response => { if (response.ok)
            {
            figure.remove();
            document.querySelector(`.gallery #works-${id}`).remove();
             closeModal();
            }}
    )
    .catch ((error) => {console.error(error)});
    })
    } 
modalContent.appendChild(modalWorks);

    //bouton-lien 'ajouter une photo' (mène à la modale 'ajout photo')
    const addPhotoSection = document.createElement('div');
    addPhotoSection.innerHTML = `<hr>
            <div class="modalBtn">
                Ajouter une photo
            </div>`;
    modalContent.appendChild(addPhotoSection);

//ouverture de la modale 'ajout photo' avec le clique sur le btn
    const addPhotoBtn = document.querySelector('.modalBtn');
    addPhotoBtn.addEventListener('click', generateSecondModal);
}

// Fonction go back
async function goBack() {
    closeModal();
    const response = await fetch('http://localhost:5678/api/works');
    let works = await response.json();
    generateModal(works);
  }

async function sendImage(event) {
    event.preventDefault();
      // recupérer les valeurs
    const image = document.getElementById("image").files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("category-select").value;
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
  
    const requestInfos = {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: formData
    }
     try {
      const response = await fetch("http://localhost:5678/api/works", requestInfos);
      const data = await response.json();
  
      if (data.hasOwnProperty("title") && data.hasOwnProperty("imageUrl") && data.hasOwnProperty("categoryId")) {
  
        let figure = document.createElement("figure");
        figure.id = `works-${data.id}`;
        let img = document.createElement("img");
        img.src = data.imageUrl;
        let figcaption = document.createElement("figcaption");
        figcaption.innerHTML = data.title;
  
        figure.appendChild(img);
        figure.appendChild(figcaption);
  
        //ajoute l'image dans la gallerie&modale
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(figure);
      }
    }  catch (error) {
      console.error("Error:", error);
     }
}

function generateSecondModal(event) {
    event.preventDefault();
    //création de la modale 2
    const modal = document.querySelector('aside');
    const modalContent = document.querySelector('.modal-container');
    modalContent.innerHTML= "";
    modalContent.innerHTML = `<button class="js-previous-modal">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </button>
                                <button class="js-close-modal2"><i class="fa-solid fa-xmark"></i></button>
                                <h3>Ajout photo</h3>`
    const main = document.querySelector('main');
    main.appendChild(modal);
    modal.appendChild(modalContent);
    //contenu de la modale
    const form = document.createElement("form");
    form.action = "http://localhost:5678/api/works";
    form.method = "post";
    form.id = "form";
    form.classList.add("modal2-form");
    form.innerHTML = `
      <div class="modal-files">
        <i class="fa-regular fa-image"></i>
        <label for="image" id="add-file" class="cursor">+ Ajouter photo</label>
        <input type="file" name="image" id="image" hidden>
        <p>jpg, png : 4mo max</p>
      </div>
      <label for="title" class="add-img-title">Titre</label><br>
      <input type="text" name="title" id="title" required>
      <p id="too-short"></p>
      <label for="category" id="category">Catégorie</label><br>
      <select name="category" id="category-select" required>
      <select/>
      <p id="error-message"></p>
      <hr>
      <div>
        <input type="submit" value="Valider" id="submit" class="submit-btn center-alignment cursor" disabled>
      </div>`;
      modalContent.appendChild(form);

      // Image preview
  const image = document.getElementById("image");
  image.onchange = () => {
    const file = image.files[0];
    if (file) {
      // Validation format type
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSizeInBytes = 4 * 1024 * 1024;
      if (!allowedTypes.includes(file.type)) {
        alert("Veuillez sélectionner une image au format JPG ou PNG.")
        image.value = "";
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert("La taille de l'image ne doit pas dépasser les 4mo.")
        image.value = "";
        return;
      }
      
      //container de l'img preview
      const imagePreview = document.createElement('img');
      imagePreview.style.maxWidth = "32%";
      imagePreview.style.maxHeight = "100%";
      imagePreview.src = URL.createObjectURL(file);
      //supprime les éléments de modal-files pour afficher l'img à la place
      const modalFiles = document.querySelector('.modal-files');
      const iconFile = document.querySelector('.fa-image');
      iconFile.style.display = "none";
      const addFile = document.getElementById('add-file');
      addFile.style.display = "none";
      const text = document.querySelector('#form p');
      text.style.display = "none";
      modalFiles.style.padding = "0";

      modalFiles.appendChild(imagePreview);
    }
  };
  const formValidation = document.getElementById('form');
  formValidation.addEventListener("submit", sendImage);

  selectOptions();

    //quitter la modale
    modalContent.querySelector('.js-close-modal2').addEventListener('click', closeModal);
    //retourner à la modal 'gallerie photo'
    const returnModal = document.querySelector('.js-previous-modal');
    returnModal.addEventListener('click', goBack);
    

    // Check form elements validity
  let checks = {
    imageElementIsFilled: false,
    titleElementIsFilled: false,
    categoryElementIsFilled: false,
  };
  // Check the image
  const imageElement = document.getElementById("image");
  imageElement.addEventListener("change", () => {
    const inputImage = imageElement.files[0];
    if (inputImage) {
      checks["imageElementIsFilled"] = true;
      checkFormValidity(checks);
    }
  });
  // Check the title
  const titleElement = document.getElementById("title");
  titleElement.addEventListener("change", () => {
    const inputTitle = titleElement.value;
    if (inputTitle.length > 5) {
      checks["titleElementIsFilled"] = true;
      const tooShort = document.getElementById("too-short");
      tooShort.style.display = "none";
    } else {
      checks["titleElementIsFilled"] = false;

      // print errors when it doesn't work
      const tooShort = document.getElementById("too-short");
      tooShort.innerText = "Titre trop court, veuillez écrire plus de 5 lettres!";
      tooShort.style.color = "red";
      tooShort.style.marginBottom = "10px";
    }
    checkFormValidity(checks);
  });
  // Check the category
  const categoryElement = document.getElementById("category-select");
  categoryElement.addEventListener("change", () => {
    const selectCategoryId = parseInt(categoryElement.value);
    const categoriesID = categories.map((category) => category.id );

    if (categoriesID.includes(selectCategoryId)) {
      checks["categoryElementIsFilled"] = true;
    } else {
      checks["categoryElementIsFilled"] = false;
    }
    checkFormValidity(checks);
  });
}


async function selectOptions() {
    try {
      const categorySelect = document.getElementById("category-select");
      // Clear existing options
      categorySelect.innerHTML = "";
  
      // Empty option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      categorySelect.appendChild(defaultOption);
  
      // Loop through categories and create options
      categories.forEach(category => {
        const categoryOption = document.createElement("option");
        categoryOption.id = "option";
        categoryOption.value = category.id;
        categoryOption.innerText = category.name;
  
        categorySelect.appendChild(categoryOption);
      });
    } catch (error) {
      console.error("Error categories:", error);
    }
}

  
function checkFormValidity(checks) {
    const buttonElement = document.getElementById("submit");
    // Read the keys inside checks
    if (checks.imageElementIsFilled && checks.titleElementIsFilled && checks.categoryElementIsFilled) {
      buttonElement.disabled = false;
      buttonElement.style.backgroundColor = "#1D6154";
  
      const selectMargin = document.getElementById("category-select");
      selectMargin.style.marginBottom = "47px";
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "none";
    } else {
      buttonElement.disabled = true;
      buttonElement.style.backgroundColor = "#A7A7A7";
  
      // print errors when it doesn't work
      const categoryMargin = document.getElementById("category-select");
      categoryMargin.style.marginBottom = "12px";
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = "Veuillez remplir correctement le formulaire.";
      errorMessage.style.color = "red";
      errorMessage.style.marginBottom = "30px";
      errorMessage.style.display = "block";
    }
}