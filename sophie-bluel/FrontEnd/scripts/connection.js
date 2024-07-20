
//Creation du contenu de la page

const form = document.querySelector('form');

function generateConnection() {
    //champ de saisie de l'e-mail
    const labelEmail = document.createElement('label');
    const inputEmail = document.createElement('input');
    labelEmail.setAttribute('for','email');
    inputEmail.setAttribute('type','text');
    inputEmail.setAttribute('name','email');
    inputEmail.setAttribute('id','email');
    labelEmail.innerHTML = 'E-mail';
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);

    //champ de saisie du mot de passe
    const labelPassword = document.createElement('label');
    const inputPassword = document.createElement('input');
    labelPassword.setAttribute('for','password');
    inputPassword.setAttribute('type','password');
    inputPassword.setAttribute('name','password');
    inputPassword.setAttribute('id','password');
    labelPassword.innerHTML = 'Mot de passe';
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);

    //Message d'erreur
    const wrongEntry = document.createElement('p');
    wrongEntry.setAttribute('id','incorrectEntry');
    wrongEntry.classList.add('error-message');
    wrongEntry.innerHTML = 'E-mail ou mot de passe incorrect';
    wrongEntry.setAttribute('style','display:none');
    form.appendChild(wrongEntry);

    //Bouton de connexion
    const inputConnection = document.createElement('input');
    inputConnection.setAttribute('type','submit');
    inputConnection.setAttribute('value','Se connecter');
    form.appendChild(inputConnection);

    //Mot de passe oublié texte
    const forgottenPassword = document.createElement('p');
    forgottenPassword.innerHTML = 'Mot de passe oublié';
    forgottenPassword.classList.add('underline');
    forgottenPassword.classList.add('center-alignment');
    form.appendChild(forgottenPassword);
 }
 generateConnection()

function loginAuth(){
    form.addEventListener('submit', (event) => {
        event.preventDefault() ;
        //Verification des elemets du formulaires
        // récuperer les données tapées par user
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
        //transformation en format json
            let formData = JSON.stringify({email:email, password:password});
        // ???

        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            body: formData,
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
            .then((data) => {
                console.log(data);

                if(data.hasOwnProperty('userId') && data.hasOwnProperty('token') ) {
                    console.log(data);
                    //créer le localStorage
                    window.localStorage.setItem('userData', JSON.stringify(data));
                    //rediriger user vers la page accueil
                    window.location = "./index_edit.html";
                }

                else {
                    console.log('user not found');
                    const incorrectEntry = document.getElementById('incorrectEntry');
                    incorrectEntry.removeAttribute('style');
                    //créer style pour afficher msg error
                }
            }
        )
        }      
    )}

loginAuth()