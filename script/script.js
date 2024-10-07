const apiKey = "498925067a988273c8dc2d9a7a2fd1aa";
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=vietnam';

        async function checkWeather() {
            const response = await fetch(apiUrl + '&appid=${apiKey}');
            var data = await response.json();

            console.log(data);

        }


        
window.onload = () => {
    // Set default location to Vietnam
    const defaultCity = "Vietnam";
    getWeather(defaultCity);
    getWeatherForecast(defaultCity);
};

document.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        const city = document.getElementById('city');
        const cityName = document.getElementById('city-name');
        let a = city.value.substring(0,1).toUpperCase();
        let b = city.value.substring(1).toLowerCase();
        cityName.textContent = a + b;
        city.value = "";
    }
});