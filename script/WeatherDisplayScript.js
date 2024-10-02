function getWeather(){
    const apiKey = "8eb0dec5f0d5ef35f62372c60ed62fb8";
    const city = document.getElementById('city').value
    if(!city) {
        alert("Enter an city")
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            disPlayWeather(data)    
        })
        .catch(error => {
            console.log("Error fetching ", error)
            alert("Error fetching data")
        })
}

function disPlayWeather(data) {
    // reference to alls weather html elements
    const weatherContent = document.getElementById('weather-content')
    const tmpDiv = document.getElementById('temperature')
    const weatherDescription = document.getElementById('weather-description')
    const wind = document.getElementById('wind')
    const humidity = document.getElementById('humidity')
    const visibility = document.getElementById('visibility')
    const pressure = document.getElementById('pressure')
    const dewPoint = document.getElementById('dew-point')
    const weatherIcon = document.getElementById('weather-icon')

    if(data.cod === '404'){
        weatherContent.innerHTML = `<p> ${data.message} </p>`
    }else{
        // in case found, fetch all weather data 
        const temp = Math.round(data.main.temp - 273.15)
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconURL = `https://openweather.org/img/wn/${iconCode}@2x.png`
        const windData= data.wind.speed
        const humidityData = data.main.humidity
        const visibilityData = data.visibility
        const pressureData = data.main.pressure
        const dewPointData = temp - (100-humidityHTML)/5
        
        // update fetched data to all weather elements

        // weather information
        const temperatureHTML = `<p>${temp}°C</p>`
        tmpDiv.innerHTML = temperatureHTML
        const descriptionHTML = `<p>${description}</p>`
        weatherDescription.innerHTML = descriptionHTML
        // weather icon
        weatherIcon.src = iconURL
        weatherIcon.alt = description

        // weather features
        const windHTML = `<p>${windData}</p>`
        wind.innerHTML = windHTML
        const humidityHTML = `<p>${humidityData}</p>`
        humidity.innerHTML = humidityHTML
        const visibilidyHTML = `<p>${visibilityData}</p>`
        visibility.innerHTML = visibilidyHTML
        const pressureHTML = `<p>${pressureData}</p>`
        pressure.innerHTML = pressureHTML
        const dewPointHTML = `<p>${dewPointData}</p>`
        dewPoint.innerHTML = dewPointHTML

    }
}
document.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        getWeather()
    }
});