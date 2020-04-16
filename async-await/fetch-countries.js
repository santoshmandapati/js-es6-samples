let fetch = require('node-fetch');

async function fetchCountries() {
  console.time('FetchResponseTime');
  
  //fetch retruns a readable stream
  const stream = await fetch('https://restcountries.eu/rest/v2/all');
  //.json() returns a promise
  const json = await stream.json();
  
  console.timeEnd('FetchResponseTime');
  
  return json;
}

function sortCountries(c, sortKey) {
  return c.sort((a,b) => sortByDesc(a,b, sortKey));
}

function sortBy(a, b, key) {
  return a[key] > b[key] ? 1 : -1;
}

function sortByDesc(a, b, key) {
  return a[key] > b[key] ? -1 : 1;
}

fetchCountries().then(countries => {
  const sortedCountries = sortCountries(countries, 'area');
  const countryNames = sortedCountries.map(({name, area, population, gini, nativeName}) => ({ 
        name,
        area,
        population,
        gini,
        nativeName
      }));
  console.table(countryNames);
});
