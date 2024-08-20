

export function introduction() {
   const main = document.querySelector('main');

   const introSection = document.createElement('section');
   introSection.setAttribute('id','introduction');
   const introFigure = document.createElement('figure');
   const introImage = document.createElement('img');
   const introArticle = document.createElement('article');

   introImage.src = `./assets/images/sophie-bluel.png`;
   introArticle.innerHTML = "<h2>Designer d'espace</h2><p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p><p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p><p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>"

   main.appendChild(introSection);
   introSection.appendChild(introFigure);
   introSection.appendChild(introArticle);
   introFigure.appendChild(introImage);
}
