const apiKey = "498925067a988273c8dc2d9a7a2fd1aa";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=vietnam";

        async function checkWeather() {
            const response = await fetch(apiUrl + '&appid=${apiKey}');
            var data = await response.json();

            console.log(data);

        }
