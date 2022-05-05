export function markupCountries({ capital, population, languages }) {

    return `
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${Object.values(languages)}</p>`
}