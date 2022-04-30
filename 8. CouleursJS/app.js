const inputsCouleur = document.querySelectorAll('.inp-couleur');
const inputRange = document.querySelector('.inp-range');
const btns = document.querySelectorAll('button');
const fond = document.body;

// Démarrage
let valCouleurs = ['#BA5370', '#F4E2D8'];
let inclinaison = 45;
let index = 3;
inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;

//Inclinaison

inputRange.addEventListener('input', (e) => {

    inclinaison = e.target.value*3.6;
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
})

// Rajout et Suppression

btns.forEach(btn => {
    btn.addEventListener('click', rajouteEnleve);
})

function rajouteEnleve(e){

    const allInputs = document.querySelectorAll('inp-couleur');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    //console.log(randomColor);

    if(e.target.className === plus){

        if(allInputs.length > 8){
            return;
        }

        const nvCouleur = document.createElement('input');
        nvCouleur.setAttribute('class', 'inp-couleur');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlenght', 7);
    }
}