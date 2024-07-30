
export function indexEdit(){
let userLoginInfo = window.localStorage.getItem('userData');
console.log(userLoginInfo)

if (userLoginInfo !== null){
 //banner edit
 const bannerEdit = document.createElement('div');
 bannerEdit.classList.add('edit-page-header');
 bannerEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>';
 const body = document.querySelector('body');
 body.insertAdjacentElement('afterbegin',bannerEdit);


  //efface le titre et les btn filtres
  const filterBar = document.querySelector('.filterButtons');
  filterBar.style.display='none';
  const portfolioH2 = document.querySelector('#portfolio h2');
  portfolioH2.style.display='none';

  //créé le titre & btn modifier
  const portfolioTitleSection = document.createElement('div');
  portfolioTitleSection.classList.add('center-alignment');
  portfolioTitleSection.innerHTML = `
    <h2>Mes projets </h2>
    <a href="#modal1" class="js-modal"><i class="fa-regular fa-pen-to-square"></i> modifier </a>`;



  //créé le btn logout
  const logout = document.createElement('li');
  logout.innerText = "logout" ;
  logout.className = "logout" ;
 
  //récuperer notre liste ul et y ajouter logout
  const ul =  document.querySelector('nav ul');
  const listItems = ul.getElementsByTagName('li');
  console.log(listItems);
  // essaie inserer notre logout
  //recuper le dernier element
  const lastItem = listItems[listItems.length - 1];
  lastItem.insertAdjacentElement('beforebegin',logout);

  const sectionPortfolio = document.getElementById('portfolio');
  //met le titre & 'modifier' avant le portfolio
  sectionPortfolio.insertAdjacentElement('afterbegin',portfolioTitleSection);

  //supprime le btn login
  const login = document.getElementById('login');
  login.style.display='none';
 
  logout.addEventListener('click', function() {
   //remove localStorage
   window.localStorage.removeItem('userData');
   //reload page
   location.reload();
  });
}
}


