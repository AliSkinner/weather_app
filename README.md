# Weather App

Node command-line app that takes an address or post/zip code and returns location data and current weather conditions.

## To Set Up

* Sign up and get an API key from [Darksky](https://darksky.net/dev/).
* `git clone https://github.com/AliSkinner/weather_app.git`.
* `cd weather_app`
* `npm install`

## Running a Query

```
Options:
  -a, --address  Address to fetch weather for                [string] [required]
  -k, --key      API key for the Forcast.io                  [string] [required]
  --help, -h     Show help                                             [boolean]
```

### Example Query  
```
> node weather_app.js -a 'W1W 8LG' -k API_KEY
Great Castle St, London W1W 8LG, UK
Its 50.43, but it feels like 48.43.
```
