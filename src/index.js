import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import { markupCountries } from "./markupCountries"
import template from "./country-item.hbs"
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input'),
    list: document.querySelector('.country-list'),
    box: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

// fetch(`https://restcountries.com/v3.1/all`).then(response => { return response.json }).then(name => { console.log(name) })


function searchCountries(e) {
    const countryName = (e.target.value).trim();
    // console.log(countryName)
    clearCountries();

    if (countryName) {

        fetchCountries(countryName)
            .then(countries => {

                if (countries.length === 1) {

                    renderDataCountries(countries);
                    renderFlagAndNameCountries(countries);

                } else if (countries.length >= 2 && countries.length <= 10) {

                    renderFlagAndNameCountries(countries);

                } else if (countries.length > 10) {
                    Notify.warning("Too many matches found. Please enter a more specific name.");
                }
            })
            .catch(error => {
                console.log(error);
                Notify.failure("Oops, there is no country with that name")
            })
    }
}

function renderFlagAndNameCountries(countries) {
    refs.list.insertAdjacentHTML('beforeend', template(countries))
}

function renderDataCountries(countries) {
    refs.box.insertAdjacentHTML('beforeend', markupCountries(countries[0]))
}

function clearCountries() {
    refs.box.innerHTML = "";
    refs.list.innerHTML = "";
}

Notify.init({
    warning: {
        background: '#00bfff',
    },
    width: '280px',
    position: 'right-top',
    distance: '30px',
    borderRadius: '10px',
    timeout: 2000,
    cssAnimationStyle: 'from-right',
})