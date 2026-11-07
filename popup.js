const API = "22217f197e348a24342b633e6c8ae873";
let data;
navigator.geolocation.getCurrentPosition(async (position)=>{
    const {latitude, longitude} = position.coords;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}7&lon=${longitude}&units=metric&appid=${API}`);
    data = await response.json();
});