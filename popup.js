const API = "22217f197e348a24342b633e6c8ae873";
const temp = document.getElementById("temp");
const tempdesc = document.getElementById("tempdesc");
const feelslike = document.getElementById("feelslike");
const highlow = document.getElementById("highlow");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");

const guideButton = document.getElementById("guideButton");
const guideClose = document.getElementById("guideClose");

const citySearch = document.getElementById("citySearch");
const cityInput = document.getElementById("cityInput");
let cityList;
async function getCityList() {
    const response = await fetch(chrome.runtime.getURL("city.list.json"));
    cityList = await response.json();
}

function doneLoading() {
    const container = document.getElementById("container");
    const manualLocation = document.getElementById("manualLocation");
    const loading = document.getElementById("loading");
    loading.style.display = "none";
    manualLocation.style.display = "none";
    container.style.visibility = "visible";
}
function changeRock(data) {
    const desc = data.weather[0].main;
    const windy = data.wind.speed*3.6;
    const temp = data.main.temp;
    const sunrise = new Date(data.sys.sunrise*1000);
    const sunset = new Date(data.sys.sunset*1000);
    const time = new Date();
    if (desc === 'Rain' || desc === 'Drizzle' || desc === 'Thunderstorm') {
        const watersplash = document.getElementById("watersplash");
        watersplash.style.display = "block";
    }
    if (windy >= 30) {
        const stringAndRock = document.getElementById("stringAndRock");
        const swingAngle = Math.min(windy*0.1, 90);
        document.documentElement.style.setProperty('--swing-angle-left', `${-1*swingAngle}deg`);
        document.documentElement.style.setProperty('--swing-angle-right', `${swingAngle}deg`);
        stringAndRock.classList.toggle("swing");
    }
    if (temp <= 15) {
        const scarf = document.getElementById("scarf");
        scarf.style.display = "block";
    }
    if (temp >= 30) {
        const sweat = document.getElementById("sweat");
        sweat.style.display = "block";
    }
    if (desc === 'Clear' && time >= sunrise && time <= sunset) {
        const shadow = document.getElementById("shadow");
        shadow.style.display = "block";
    }
    if (desc === 'Fog') {
        const fog = document.getElementById("fog");
        fog.style.display = "block";
    }
    if (desc === 'Snow') {
        const snow = document.getElementById("snow");
        snow.style.display = "block";
        const rock = document.getElementById("rock");
        rock.src = "images/snowrock.png";
    }
    if (time.getHours() >= 22 || time.getHours() <= 6) {
        const sleepmask = document.getElementById("sleepmask");
        sleepmask.style.display = "block";
    }
}

function showManualLocation() {
    const loading = document.getElementById("loading");
    const manualLocation = document.getElementById("manualLocation");
    loading.style.display = "none";
    manualLocation.style.display = "block";
}
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Weather data unavailable");
        }
        const data = await response.json();
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        tempdesc.textContent = data.weather[0].description;
        feelslike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
        highlow.textContent = `H: ${Math.round(data.main.temp_max)} L: ${Math.round(data.main.temp_min)}`
        humidity.textContent = `${Math.round(data.main.humidity)}%`;
        wind.textContent = `${Math.round(data.wind.speed*3.6)} km/h`;
        visibility.textContent = `${Math.round(data.visibility/1000)} km`;
        pressure.textContent = `${Math.round(data.main.pressure)} hPa`;

        changeRock(data);
    } catch (error) {
        console.log(error);
        showManualLocation();
    } finally {
        doneLoading();
    }
}
navigator.geolocation.getCurrentPosition(async (position)=>{
    const {latitude, longitude} = position.coords;
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API}`);
}, ()=>{
    showManualLocation();
});

getCityList().then(()=>{
    cityInput.addEventListener("input", ()=>{
        const currentValue = cityInput.value.trim().toLowerCase();
        const matches = cityList.filter(city => city.name.toLowerCase().startsWith(currentValue)).slice(0, 5);
        const citySuggestions = document.getElementById("citySuggestions");
        citySuggestions.innerHTML = "";
        for (const city of matches) {
            const option = document.createElement("div");
            option.textContent = `${city.name}`;
            option.className = "cityOptions";
            citySuggestions.appendChild(option);
        }
});
document.addEventListener("click", (event)=>{
    if (event.target.classList.contains("cityOptions")) {
        const city = event.target.textContent;
        cityInput.value = city;
    }
});

});
citySearch.addEventListener("click", ()=>{
    const city = cityInput.value.trim();
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API}`);
});

guideButton.addEventListener("click", ()=>{
    const guide = document.getElementById("guide");
    if (guide.style.display === 'none') {
        guide.style.display = 'flex';
    }
    else {
        guide.style.display = 'none';
    }
});
guideClose.addEventListener("click", ()=>{
    const guide = document.getElementById("guide");
    if (guide.style.display === 'flex') {
        guide.style.display = 'none';
    }
});