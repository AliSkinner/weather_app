const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
      a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
      },
      k: {
        demand: true,
        alias: 'key',
        describe: 'API key for the Forcast.io',
        string: true
      }
    })
    .help()
    .alias('help', 'h')
    .argv;

const API_KEY = argv.key;
const API_URL = `https://api.darksky.net/forecast/${API_KEY}`;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('unable to find that address');
  }

  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherUrl = `${API_URL}/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);

}).then((response) => {

  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Its ${temperature}, but it feels like ${apparentTemperature}.`);

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('unable to connect to API servers');
  } else {
    console.log(e.message);
  }
});
