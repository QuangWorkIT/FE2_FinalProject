async function getWeatherForecast(city) {
    const apiKey = "1b2d572fc097dd9043d068ae23daad44"; 
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        displayForecast(data.list);
        console.log(data);
    } catch (error) {
        console.error("Error fetching forecast data: ", error);
    }

}
function displayForecast(forecastData) {
    const forecastItemContainer = document.getElementById('forecast-container');
    forecastItemContainer.innerHTML = "";
    forecastData.forEach((data, index) => {
        if (index % 8 === 0) {
            const date = new Date(data.dt_txt);
            const dayName = date.toLocaleDateString('en-US', {
                weekday: 'short'
            });
            const dayDate = date.getDate();
            const temp = Math.round(data.main.temp);
            const iconCode = data.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const li = document.createElement('li');
            li.innerHTML = `
                <p class="date-content">${dayDate} ${dayName}</p>
                <img src="${iconURL}" alt="#" width="80px" height="80px">
                <p class="temperature-content">${temp}&degC</p>
            `;
            forecastItemContainer.appendChild(li);
        }
    });
}

document.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        const cityValue = document.getElementById('city').value
        getWeatherForecast(cityValue)
    }
});