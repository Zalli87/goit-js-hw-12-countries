import countryCardTpl from '../src/templates/country-card.hbs';

const refs = {
    cardConteiner: document.querySelector('.card-container')
}


 fetch('https://restcountries.eu/rest/v2/name/ukraine').then(response => {
        return response.json();
 }).then(createCountryCard).catch(error => {
     console.log(error);
 });

function fetchCountryByName() {
     fetch('https://restcountries.eu/rest/v2/name/ukraine').then(response => {
        return response.json();
 }).then(createCountryCard).catch(error => {
     console.log(error);
 });
};

function createCountryCard(countrys) {
      countrys.map(country => {
      const markup = countryCardTpl(country);
         console.log(markup);
         refs.cardConteiner.innerHTML = markup;
     });
};
