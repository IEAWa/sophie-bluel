const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

export function generateWorks(){

const main = document.querySelector('main')
const portfolioSection = document.createElement('section');
portfolioSection.setAttribute('id','portfolio');
const portfolioTitle = document.createElement('h2');
portfolioTitle.innerHTML = "Mes Projets";
const portfolioGallery = document.createElement('div');
portfolioGallery.classList.add('gallery');

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
};
}
