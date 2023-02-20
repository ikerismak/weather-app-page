import {getLocation,showPosition } from "./location.js";

const submit = document.querySelector("#submit");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const results = document.querySelectorAll("#results");

const key = "5e61299d7b98d1cf93b7c56a23bf210b";

const getData = async (city) => {
  const response = await fetch(

    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`

  );
  const data = await response.json();
  return data;
};

const getWeather = async (lat,lon) => {
    const response = await fetch(

        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

    );
    const data = await response.json();
    console.log(data);
    return data;
  };

const getCoords = async() =>{


  const inputInfoCity = input.value;
  const altLat = await getData(inputInfoCity);

  return altLat

}

// window.addEventListener('DOMContentLoaded', (event) => {

//     getLocation();

// });

form.addEventListener("submit",async(event) => {

    event.preventDefault();

    const coords = await getCoords()

    let lat = coords[0].lat;
    let lon = coords[0].lon;

    const weather = await getWeather(lat, lon);


    const objectWeather = {

        name: weather.name,
        feels_like: weather.main.feels_like,
        humidity: weather.main.humidity,
        temp: weather.main.temp,
        temp_max: weather.main.temp_max,
        temp_min: weather.main.temp_min,
        weather: weather.weather[0].main,
        wind_speed: weather.wind.speed,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,


    };

    console.log(objectWeather);




    document.querySelector("#location").innerText = objectWeather.name;
    document.querySelector("#weather").innerText = objectWeather.weather;
    document.querySelector("#temperature").innerText = objectWeather.temp + "°F";
    document.querySelector("#max").innerText = objectWeather.temp_max + " °F";
    document.querySelector("#min").innerText = objectWeather.temp_min + " °F";
    document.querySelector("#chill").innerText = objectWeather.feels_like + "°F";
    document.querySelector("#description").innerText = objectWeather.description;
    document.querySelector("#humidity").innerText = objectWeather.humidity + " %";
    document.querySelector("#windspeed").innerText = objectWeather.wind_speed + " mill/h";

    document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + objectWeather.icon + "@2x.png"




});






















