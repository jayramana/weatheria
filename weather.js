// Weather APP

const apiKey = "a0da88ba15cdf980d8b9c82fef9499c2"; // Replace with your OpenWeather API key
// Replace with the city you want to get weather data for
const units = "metric"; // You can change the units to 'imperial' or other options
const searchbtn = document.querySelector(".search-icon");
let tempe = 0;
var theme = "light";
var dark = document.getElementById("moon");
var light = document.getElementById("sun");
document.getElementById("content").style.backgroundColor = "#f1f3f5";
// Function to fetch and display weather data
document.getElementById("wea-dis").style.display = "none";
if (theme === "light") {
  document.getElementById("sun").style.display = "none";
}
dark.addEventListener("click", () => {
  theme = "dark";
  document.getElementById("nam").style.color = "white";
  const lst = document.getElementsByClassName("tg");
  for (let i = 0; i < lst.length; i++) {
    lst[i].style.color = "white";
  }
  document.getElementById("moon").style.display = "none";
  document.getElementById("sun").style.display = "block";
  document.getElementById("content").style.backgroundColor = "black";
  document.getElementById("city-name").style.color = "white";
  document.getElementById("wea-dis").style.backgroundColor = "transparent";
  document.getElementById("search-bx").style.backgroundColor = "white";
  searchbtn.style.color = "white";
  document.getElementById("city-t").style.color = "white";
  document.getElementById("des").style.color = "white";
  document.getElementById("min").style.color = "white";
  document.getElementById("max").style.color = "white";
  document.querySelector(".humidity").style.color = "white";
  document.querySelector(".wind").style.color = "white";

  let weadis = document.querySelectorAll(".description");
  let tempc = document.querySelectorAll(".feels");

  document.querySelectorAll(".day").forEach((e) => {
    e.addEventListener("mouseover", () => {
      e.style.boxShadow = "0px 0px 20px 0px white";
    });
    e.addEventListener("mouseleave", () => {
      e.style.boxShadow = "none";
    });
  });

  weadis.forEach((e) => {
    e.style.color = "white";
  });

  tempc.forEach((e) => {
    e.style.color = "white";
  });

  let day = document.querySelectorAll(".day-n");
  // day.forEach((e) => {
  //   e.style.color = "white";
  // });
  let color = [`#fab005`, `white`, `#4f3A3C`, `#DA9100`, `#8EE5EE`];
  for (let i = 0; i < 5; i++) {
    day[i].style.color = color[i];
  }

  document.querySelectorAll(".description").forEach((e) => {
    e.style.color = "white";
  });
  document.querySelectorAll(".feels").forEach((e) => {
    e.style.color = "white";
  });
  document.querySelector(".time").style.color = "white";

  console.log(theme);
});

light.addEventListener("click", () => {
  light.style.display = "none";
  dark.style.display = "block";
  document.querySelectorAll(".day").forEach((e) => {
    e.addEventListener("mouseover", () => {
      e.style.boxShadow = "0px 0px 20px 5px black";
    });
    e.addEventListener("mouseleave", () => {
      e.style.boxShadow = "none";
    });
  });

  document.getElementById("content").style.backgroundColor = "#f1f3f5";
  document.querySelectorAll(".tg").forEach((element) => {
    element.style.color = "black";
  });
  // document.querySelectorAll(".day-n").forEach((e) => {
  //   e.style.color = "black";
  // });
  let day = document.querySelectorAll(".day-n");

  document.getElementById("nam").style.color = "black";
  searchbtn.style.color = "black";
  document.querySelectorAll(".temps").forEach((element) => {
    document.getElementById("city-name").style.color = "black";
    document.getElementById("city-t").style.color = "black";
    document.getElementById("min").style.color = "black";
    document.getElementById("max").style.color = "black";
    document.getElementById("des").style.color = "black";
    document.querySelector(".humidity").style.color = "black";
    document.querySelector(".wind").style.color = "black";
    document.querySelectorAll(".description").forEach((e) => {
      e.style.color = "black";
    });
    document.querySelectorAll(".feels").forEach((e) => {
      e.style.color = "black";
    });
    let color = [`#fab005`, `white`, `#4f3A3C`, `#DA9100`, `#8EE5EE`];
    for (let i = 0; i < 5; i++) {
      day[i].style.color = color[i];
    }
  });
});

async function fetchWeatherData(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    const timestamp = data.dt; 
    const date = new Date(timestamp * 1000); 
    const dateStr = date.toLocaleString(); 

    document.querySelector(".time").textContent = `Weather data for ${city} as of ${dateStr}`;

    // Access specific weather information
    let temperature = data.main.temp;
    let max_temp = data.main.temp_max;
    let min_temp = data.main.temp_min;
    let icon = data.weather[0].icon;
    console.log(icon);
    tempe = temperature;
    const weatherDescription = data.weather[0].description;
    document.getElementById("wea-dis").style.display = "block";

    // Display the weather data in the console
    console.log(`Temperature in ${city}: ${temperature}°C`);
    console.log(`Weather in ${city}: ${weatherDescription}`);
    document.getElementById("city-name").innerText = city;
    document.getElementById(
      "des-icon"
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("city-t").innerText = tempe + " °C";
    document.getElementById("des").innerText = weatherDescription;
    document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
    document.querySelector(".wind").innerText = `${data.wind.speed}m/s`;
    document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("min").innerText = min_temp + " °C";
    document.getElementById("max").innerText = max_temp + " °C";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
searchbtn.addEventListener("click", () => {
  const city = document.querySelector(".weather-city").value;
  console.log(city);
  fetchWeatherData(city);
  fdayforecast(city);
  aqi(city);
});
6
async function fdayforecast(city) {
  let dt = new Date();
  console.log(`${dt.getDate()}`);
  console.log(`${dt.getMonth() + 1}`);
  console.log(`${dt.getFullYear()}`);
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  for (let i = 0; i < 5; i++) {
    let arr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let color = [`#fab005`, `white`, `#4f3A3C`, `#DA9100`, `#3D85C6`];
    let date = new Date();
    let dat = (date.getDay() + i + 1) % 7;
    let day = document.querySelectorAll(".day-n");

    day[i].textContent = arr[dat];
    day[i].style.color = color[i];
    console.log(i);
    let temp = Number(data.list[i].main.temp - 273.15).toFixed(2) + "°C";
    let icon = data.list[i].weather[0].icon;
    console.log(icon);

    let desIconElements = document.querySelectorAll(".des-icon");
    let weadis = document.querySelectorAll(".description");
    let tempc = document.querySelectorAll(".feels");

    if (desIconElements[i] && weadis[i] && tempc[i]) {
      weadis[i].textContent = data.list[i].weather[0].description;
      desIconElements[
        i
      ].src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      tempc[i].textContent = temp;
    }
    document.querySelectorAll(".day").forEach((e) => {
      e.style.display = "block";
    });
  }
}

async function aqi(city) {
  const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
  const response = await fetch(geourl);
  const data = await response.json();
  let lat = data[0].lat;
  let lon = data[0].lon;
  console.log(lat, lon);
  const aqiurl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const res = await fetch(aqiurl);
  const data1 = await res.json();
  let aqi = data1.list[0].main.aqi;
  console.log(aqi);
  let index = document.querySelector(".aqi");
  index.style.fontFamily = "Lato";
  index.textContent = aqi;
  if (aqi == 1) {
    index.style.color = "#2f9e44";
  } else if (aqi == 2) {
    index.style.color = "#38d9a9";
  } else if (aqi == 3) {
    index.style.color = "#fab005";
  } else if (aqi == 4) {
    index.style.color = "#ff6b6b";
  } else if (aqi == 5) {
    index.style.color = "#c92a2a";
  }
}

// const windy = `WC68eoqoGtUir0ouj9mNCFGTuQI13KAK`;
// const news = 80bc50b5c2a34c178bb124447346dc47
