const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

const resp = await fetch('http://localhost:5678/api/categories');
const categories = await resp.json();

//création section portfolio
const main = document.querySelector('main')
const portfolioSection = document.createElement('section');
portfolioSection.setAttribute('id','portfolio');

//création titre 'mes projets'
const portfolioTitle = document.createElement('div');
portfolioTitle.classList.add('center-alignment');
portfolioTitle.innerHTML = `<h2>Mes Projets</h2>`;

//création de la section gallerie
const portfolioGallery = document.createElement('div');
portfolioGallery.classList.add('gallery');
main.appendChild(portfolioSection);
portfolioSection.appendChild(portfolioTitle);

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
portfolioSection.appendChild(portfolioGallery);
portfolioGallery.appendChild(figure);
figure.appendChild(figImage);
figure.appendChild(figCaption);
};}


//création barre de boutons des filtres
const filterBar = document.createElement('div');
filterBar.classList.add('filterBar');
filterBar.innerHTML = `
<div class="filterBtn filterBtn:hover"> Objets </div>
<div class="filterBtn filterBtn:hover"> Tous </div>
<div class="filterBtn filterBtn:hover"> Appartements </div>
<div class="filterBtn filterBtn:hover"> Hotels & restaurants </div>`
portfolioSection.appendChild(filterBar);

export function generatePortfolio(works){

//portfolioSection.innerHTML = ``;
generateWorks(works)
    
  const filterBtns = document.querySelectorAll('.filterBar div');
    filterBtns.forEach( button => {
       button.addEventListener('click' , () => {
           let filterTerm = button.textContent.trim();

           switch (filterTerm){
               case "Objets":
                   const worksObjets =  works.filter((work) => work.category.name === "Objets" );
                   generateWorks(worksObjets);
                   console.log('Objets test');
                   break;


               case "Appartements":
                   const worksAppartements =  works.filter((work) => work.category.name === "Appartements" );
                   generateWorks(worksAppartements);
                   break;
                
                case "Hotels & restaurants":
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
