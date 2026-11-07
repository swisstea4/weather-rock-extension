const API = "22217f197e348a24342b633e6c8ae873";
let geonameId = "";
navigator.geolocation.getCurrentPosition(async (position)=>{
    const {latitude, longitude} = position.coords;
    const response = await fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=swisstea`);
    const data = await response.json();
    geonameId = data.geonames[0].geonameId;
});