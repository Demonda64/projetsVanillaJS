import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';



const CLEAPI = 'f5501af762ea1872206607f5d3ce7393'; // Créer une const pour récup la cléAPI insérer la clé API
let resultatsAPI; // Créer une variable pour récupérer les résultast On fait démarrer avec "indifined" puis on rempli avec les résultats de la requete


const temps = document.querySelector('.temps'); // On declare la const de la classe html temps
const temperature = document.querySelector('.temperature');// On declare la const de la classe html temperature
const localisation = document.querySelector('.localisation');// On declare la const de la classe html localisation
const heure = document.querySelectorAll('.heure-nom-prevision');// On declare la const de la classe html
const tempsPourH = document.querySelectorAll('.heure-prevision-valeur');// On declare la const de la classe html
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overplay-icone-chargement');

if(navigator.geolocation){ // Condition de localisation
    navigator.geolocation.getCurrentPosition(position =>{ // La methode "getCurrentPosition" permet d'avoir la position

        //console.log(position);
        let long = position.coords.longitude; // Creer une variable pour récuperer la longitude
        let lat = position.coords.latitude; // Creer une variable pour récuperer la l'attitude
        AppelAPI(long,lat); // Appel de la méthode "function AppelAPI" avec long et lat en argument


    }, () => {
        alert (`Vous avez refusé la géolocalisation l'application ne peut pas fonctionner,veuillez l'activer !`) // Si la localisation est refusée un message apparait



    })
}

function AppelAPI(long, lat) {
//L'API Fetch fournit une interface JavaScript pour l'accès et la manipulation des parties de la pipeline HTTP, comme les requêtes et les réponses. Cela fournit aussi une méthode globale fetch() qui procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) =>{
        

        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description; //récupération des donées de la const temps
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`; // récupération des données de la const température la methode Math.func permet d'afficher que les unités
        localisation.innerText = resultatsAPI.timezone; //récupération des données de la const localisation

        
        // Afficher les heures par tranche de 3 


        let heureActuelle = new Date().getHours(); // Constructeur New Date() puis la méthode getHours() renvoie l'heure pour la date renseignée, d'après l'heure locale.


        // itération

        for( let i = 0; i < heure.length; i++){ // tableau des elements du DOM pour les heures

            let heureIncr = heureActuelle + i * 3; // Calcul des 3 heures prévisionnelles
            
            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24 } h`; // revenir à 0 pour la journée suivante
            }else if (heureIncr === 24 ) {
                   heure[i].innerText = "00h" // afficher 00h
            } else {
                heure[i].innerText = `${heureIncr} h` ;  // affichage des heures dans les cases                                                                                                     
            
               
            }
                
        }
        
        // Afficher les temperatures pour 3h prévisionnelle

        for( let j = 0;j < tempsPourH.length; j++) { // tableau des elements du DOM pour les temperature par heure
            tempsPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j*3].temp) }°`; // affichage des 3h prévisonnelle 
        }


        // 3 premieres lettres des jours

        for(let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
        }

        // Temp par jour 

        for(let m = 0;m < 7; m++){
            tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m+1].temp.day)}°`
        }

        // Icone Dynamique
        if(heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src =`ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        }else {
            imgIcone.src =`ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');

    })
}