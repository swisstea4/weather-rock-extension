const API = "22217f197e348a24342b633e6c8ae873";
const temp = document.getElementById("temp");
const tempdesc = document.getElementById("tempdesc");
const feelslike = document.getElementById("feelslike");
const highlow = document.getElementById("highlow");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");
function doneLoading() {
    const container = document.getElementById("container");
    const loading = document.getElementById("loading");
    loading.style.display = "none";
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
        //fog
    }
    if (desc === 'Snow') {
        //snow
    }
    if (time >= 22 || time <= 6) {
        //sleep
    }
}
navigator.geolocation.getCurrentPosition(async (position)=>{
    const {latitude, longitude} = position.coords;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}7&lon=${longitude}&units=metric&appid=${API}`);
    const data = await response.json();
    console.log(data);
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    tempdesc.textContent = data.weather[0].description;
    feelslike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    highlow.textContent = `H: ${Math.round(data.main.temp_max)} L: ${Math.round(data.main.temp_min)}`
    humidity.textContent = `${Math.round(data.main.humidity)}%`;
    wind.textContent = `${Math.round(data.wind.speed*3.6)} km/h`;
    visibility.textContent = `${Math.round(data.visibility/1000)} km`;
    pressure.textContent = `${Math.round(data.main.pressure)} hPa`;
    changeRock(data);
    doneLoading();
});