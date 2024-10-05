const apiKey = "8eb0dec5f0d5ef35f62372c60ed62fb8";
function getWeather(city){
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.name)
            disPlayWeather(data)    
        })
        .catch(error => {
            console.log("Error fetching ", error)
            alert("Error fetching data")   
        })
}

function disPlayWeather(data) {
    // reference to alls weather html elements
    const date = document.getElementById('date')
    const time = document.getElementById('time')
    const tmpDiv = document.getElementById('temperature')
    const weatherDescription = document.getElementById('weather-description')
    const wind = document.getElementById('wind')
    const humidity = document.getElementById('humidity')
    const visibility = document.getElementById('visibility')
    const pressure = document.getElementById('pressure')
    const dewPoint = document.getElementById('dew-point')
    const weatherIcon = document.getElementById('weather-icon')
    const map = document.getElementById('map')
    
    if(data.cod === '404'){
        alert(data.message)
    }else{
        // in case found, fetch all weather data 
        const localDateTime = getLocalDate(data.timezone).toLocaleString().split(",");
        // 10/5/2024, 7:20:43 PM
        const dayMonth = localDateTime[0].split("/")[1] + "/" + localDateTime[0].split("/")[0];
        const localTime = localDateTime[1].split(":")[0]+ ":" + localDateTime[1].split(":")[1] + " " +
                        localDateTime[1].split(":")[2].split(" ")[1]  
        const temp = Math.round(data.main.temp - 273.15)
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
        const windData= data.wind.speed
        const humidityData = data.main.humidity
        const visibilityData = data.visibility
        const pressureData = data.main.pressure
        const dewPointData = temp - (100-humidityData)/5
        const mapURL = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${data.coord.lat}&lon=${data.coord.lon}&zoom=5`;
        //// update fetched data to all weather elements

        // weather information
        date.innerText = dayMonth +", "
        time.innerText = localTime
        const temperatureHTML = `<h1>${temp}°C</h1>`
        tmpDiv.innerHTML = temperatureHTML
        const descriptionHTML = `<p>${description}</p>`
        weatherDescription.innerHTML = descriptionHTML
        // weather icon
        weatherIcon.src = iconURL
        weatherIcon.alt = description

        // weather features
        const windHTML = `<p>${windData} km/h</p>`
        wind.innerHTML = windHTML
        const humidityHTML = `<p>${humidityData} %</p>`
        humidity.innerHTML = humidityHTML
        const visibilidyHTML = `<p>${visibilityData / 1000} km</p>`
        visibility.innerHTML = visibilidyHTML
        const pressureHTML = `<p>${pressureData} hPa</p>`
        pressure.innerHTML = pressureHTML
        const dewPointHTML = `<p>${dewPointData.toFixed(1)}°C</p>`
        dewPoint.innerHTML = dewPointHTML
        map.src = mapURL
    }
}

function getLocalDate(timezoneOffset){
    const myCurrentDate = new Date()
    const utcDate = myCurrentDate.getTime() - 25200000

    return new Date(utcDate + timezoneOffset*1000)
}
document.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        const cityValue = document.getElementById('city').value
        if(!cityValue) {
            alert("Enter an city")
            return;
        }
    
        let city ="";
        if(cityValue.length > 1){
            const tmp = cityValue.trim().split(" ");
            for(let i = 0; i < tmp.length; i++)
                city += tmp[i]
        }
        getWeather(city)
    }
});