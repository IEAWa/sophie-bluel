const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();


const main = document.querySelector('main')
const portfolioSection = document.createElement('section');
portfolioSection.setAttribute('id','portfolio');
const portfolioTitle = document.createElement('h2');
portfolioTitle.innerHTML = "Mes Projets";
const filterButtons = document.createElement('div');
filterButtons.classList.add('filterButtons');
const portfolioGallery = document.createElement('div');
portfolioGallery.classList.add('gallery');

//création bouton modifier pour la fenêtre modale
const modalButton = document.querySelector('main a');


//création barre de boutons des filtres
const buttonALL = document.createElement('div');
buttonALL.innerHTML = "Tous";
buttonALL.classList.add('filterBtn','filterBtn:hover');
const buttonObject = document.createElement('div');
buttonObject.innerHTML = "Objets";
buttonObject.classList.add('filterBtn','filterBtn:hover');
const buttonApartment = document.createElement('div');
buttonApartment.innerHTML = "Appartments";
buttonApartment.classList.add('filterBtn','filterBtn:hover');
const buttonHotel = document.createElement('div');
buttonHotel.innerHTML = "Hotels & restaurants";
buttonHotel.classList.add('filterBtn','filterBtn:hover');
main.appendChild(portfolioSection);
portfolioSection.appendChild(portfolioTitle);
filterButtons.appendChild(buttonALL);
filterButtons.appendChild(buttonObject);
filterButtons.appendChild(buttonApartment);
filterButtons.appendChild(buttonHotel);

//création du contenu du portfolio
export function generateWorks(works){

for (let i = 0; i < works.length; i++) {
let figure = document.createElement('figure');
let figCaption = document.createElement('figcaption');
let figImage = document.createElement('img');

figImage.src = works[i].imageUrl;
figImage.alt = works[i].title;
figCaption.innerHTML = works[i].title;

main.appendChild(portfolioSection);
portfolioSection.appendChild(portfolioTitle);
portfolioSection.appendChild(filterButtons);
portfolioSection.appendChild(portfolioGallery);
portfolioGallery.appendChild(figure);
figure.appendChild(figImage);
figure.appendChild(figCaption);
};}


export function generatePortfolio(){

    filterButtons.forEach( button => {
       button.addEventListener('click' , () => {
           let filterTerm = button.textContent.trim();

           switch (filterTerm){
               case "Objets":
                   const worksObjets =  works.filter((work) => work.category.name === "Objets" );
                   generateWorks(worksObjets);
                   break;

               case "Appartements":
                   const worksAppartements =  works.filter((work) => work.category.name === "Appartements" );
                   generateWorks(worksAppartements);
                   break;
                
                case "Appartements":
                    const worksHotelRestau =  works.filter((work) => work.category.name === "Hotels & restaurants" );
                    generateWorks(worksHotelRestau);
                    break;

               default:
                   generateWorks(works);
                   break;
           }
           }
       )
       }
   )
}
