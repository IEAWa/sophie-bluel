
export function contact() {
    const main = document.querySelector('main');
    const contactSection = document.createElement('section');
    contactSection.setAttribute('id','contact');
    const contactTitle = document.createElement('h2');
    contactTitle.innerHTML = "Contact";
    const contactTxt = document.createElement('p');
    contactTxt.innerHTML = "Vous avez un projet ? Discutons-en !";
    const contactForm = document.createElement('form');
    contactForm.setAttribute('action','#');
    contactForm.setAttribute('method','post');
    contactForm.innerHTML = `<label for="name">Nom</label>
    <input type="text" name="name" id="name">
    <label for="email">Email</label>
    <input type="email" name="email" id="email">
    <label for="message">Message</label>
    <textarea name="message" id="message" cols="30" rows="10"></textarea>
    <input type="submit" value="Envoyer">`

    main.appendChild(contactSection);
    contactSection.appendChild(contactTitle);
    contactSection.appendChild(contactTxt);
    contactSection.appendChild(contactForm);
}