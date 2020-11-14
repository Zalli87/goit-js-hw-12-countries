import debounce from 'lodash.debounce';
import countryListTpl from '../src/templates/country-list.hbs';
import countryCardTpl from '../src/templates/country-card.hbs';
import countryApi from '../src/fetchCountries';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    cardConteiner: document.querySelector('.card-container'),
    inputEl: document.querySelector('.js-search-input')
}

let searchQuery = '';

refs.inputEl.addEventListener(
  'input',
  debounce(() => {
    onSearch();
  }, 500),
);

function onSearch() {
 resetSearch();
  searchQuery = refs.inputEl.value;
  countryApi(searchQuery)
    .then(createCountryCard)
    .catch(notFound);
}

function resetSearch() {
  refs.cardConteiner.innerHTML = '';
}

function renderMarkup(template, country) {
    const markup = template(country);
    refs.cardConteiner.innerHTML = markup;
}

function toManyMatchesFound() {
  error({
    text: "To many matches found. Please enter a more specific query!",
    delay: 2000,
  });
}

function notFound() {
     info({
         title: "No matches found!.",
         text:'Please enter correct country name',
    delay: 2000,
  });
}

function createCountryCard(country) {
    if (country.length === 1) {
        resetSearch();
    renderMarkup(countryCardTpl, country)
    } else if (country.length > 1 && country.length <= 10) {
        resetSearch();
        renderMarkup(countryListTpl, country)
    }
     else if (country.length > 10) {
        toManyMatchesFound();
    }
    else {
        notFound();
    }
    };
