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
navigator.geolocation.getCurrentPosition(async (position)=>{
    const {latitude, longitude} = position.coords;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}7&lon=${longitude}&units=metric&appid=${API}`);
    const data = await response.json();
    console.log(data);
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    tempdesc.textContent = data.weather[0].description;
    feelslike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    highlow.textContent = `H: ${Math.round(data.main.temp_max)} L: ${Math.round(data.main.temp_min)}`
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed*3.6} km/h`;
    visibility.textContent = `${data.visibility/1000} km`;
    pressure.textContent = `${data.main.pressure} hPa`;
    doneLoading();
});