const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

//création section portfolio
const main = document.querySelector('main')
const portfolioSection = document.createElement('section');
portfolioSection.setAttribute('id','portfolio');

//création titre 'mes projets'
const portfolioTitle = document.createElement('h2');
portfolioTitle.innerText = "Mes Projets";
main.appendChild(portfolioSection);
portfolioSection.appendChild(portfolioTitle);

//création barre de boutons des filtres
const filterBar = document.createElement('div');
filterBar.classList.add('filterBar');
filterBar.innerHTML = `
<div class="filterBtn filterBtn:hover"> Tous </div>
<div class="filterBtn filterBtn:hover"> Objets </div>
<div class="filterBtn filterBtn:hover"> Appartements </div>
<div class="filterBtn filterBtn:hover"> Hotels & restaurants </div>`
portfolioSection.appendChild(filterBar)

//création de la section gallerie
const portfolioGallery = document.createElement('div');
portfolioGallery.classList.add('gallery');
portfolioSection.appendChild(portfolioGallery);

//création du contenu du portfolio
export function generateWorks(works){
for (let i = 0; i < works.length; i++) {
let figure = document.createElement('figure');
let figCaption = document.createElement('figcaption');
let figImage = document.createElement('img');
figure.id = `works-${works[i].id}`;

figImage.src = works[i].imageUrl;
figImage.alt = works[i].title;
figCaption.innerHTML = works[i].title;

portfolioGallery.appendChild(figure);
figure.appendChild(figImage);
figure.appendChild(figCaption);
};}

export function generatePortfolio(works){

generateWorks(works);
    
  const filterBtns = document.querySelectorAll('.filterBar div');
    filterBtns.forEach( button => {
       button.addEventListener('click' , () => {
           let filterTerm = button.textContent.trim();
           const gallery = document.querySelector('.gallery');

           switch (filterTerm){
               case "Objets":
                   const worksObjets =  works.filter((work) => work.category.name === "Objets" );
                   gallery.innerHTML = "";
                   generateWorks(worksObjets);
                   break;

               case "Appartements":
                   const worksAppartements =  works.filter((work) => work.category.name === "Appartements" );
                   gallery.innerHTML = "";
                   generateWorks(worksAppartements);
                   break;
                
                case "Hotels & restaurants":
                    const worksHotelRestau =  works.filter((work) => work.category.name === "Hotels & restaurants" );
                    gallery.innerHTML = "";
                    generateWorks(worksHotelRestau);
                    break;

               default:
                   gallery.innerHTML = "";
                   generateWorks(works);
                   break;
           }
        })
    })
}
