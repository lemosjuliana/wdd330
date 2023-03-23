
const key = '8c5ac37b8eff6867f0476cd3ed23a43b';
const lat = 33.16;
const lon = -117.33;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
const weatherIcon = document.getElementById('weather-icon');

// FORECAST

//Fetch the data and await the response, storing the response as a json object
async function getForecast() {
  const response = await fetch(forecastURL);
  if (response.ok) {
    const data = await response.json();
    outputForecast(data);
  }
}

// Displays Forecast
function outputForecast(data) {
  
  const date = new Date()
  let day = date.getDate();
  let index = 0;
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
  data.list.forEach((forecast) => {
   
    if (index % 14 == 0) {
      
      const div = document.createElement('div');
      const heading = document.createElement('p');
      const temperature = document.createElement('p');
      const words = forecast.weather[0].description.split(" ");
      const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

      //Sets attributes
      heading.innerHTML = `<b>${month[date.getMonth()]} ${day}</b>`;
      temperature.innerHTML = `${forecast.main.temp.toFixed(0)}&deg;F`;

      // Displays Weather and gets next day
      div.appendChild(heading);
      div.appendChild(temperature);
      document.getElementById('forecasts').appendChild(div);
      day += 1;
    }
    index += 1;
  });
}
//Calls forecast Data
getForecast();

// WEATHER

//Fetch the data and await the response, storing the response as a json object
async function getWeather() {
  const response = await fetch(weatherURL);
  if (response.ok) {
    const data = await response.json();
    outputWeather(data);
  }
};

// Displays Weather
function outputWeather(data) {
  const words = data.weather[0].description.split(" ");
  const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");
  document.getElementById('temperature').textContent = data.main.temp.toFixed(0);
  document.getElementById('description').textContent = description;
  document.getElementById('humidity').textContent = data.main.humidity;
  const weatherIconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute('src', weatherIconSrc);
  weatherIcon.setAttribute('alt', description);
}
//Calls Weather Data
getWeather();