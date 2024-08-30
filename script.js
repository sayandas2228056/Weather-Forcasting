const apiKey = "0fbc45d61fb14a89aa4182037243008"; // Your API key

async function checkWeather() {
    const queryLocation = document.getElementById("cityInput").value || "Bangalore"; // Default to Bangalore if no input
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${queryLocation}&aqi=no`;

    try {
        const response = await fetch(apiUrl); // Fetch data from API
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").textContent = data.location.name;
        document.querySelector(".temp").textContent = data.current.temp_c + " °C";
        document.querySelector(".humidity").textContent = data.current.humidity + " %";
        document.querySelector(".wind").textContent = data.current.wind_kph + " Km/h";

        const weatherCondition = data.current.condition.text.toLowerCase();
        console.log(`Weather condition: ${weatherCondition}`);

        // Mapping conditions to image filenames
        const conditionToIcon = {
            'clear': 'clear.png',
            'cloudy': 'clouds.png',
            'drizzle': 'drizzle.png',
            'mist': 'mist.png',
            'rain': 'rain.png',
            'snow': 'snow.png',
            'wind': 'wind.png'
        };

        // Determine the icon path based on the condition
        const iconFileName = conditionToIcon[weatherCondition] || 'default.png';
        const iconPath = `images/${iconFileName}`;
        console.log(`Icon path: ${iconPath}`);

        const weatherIcon = document.querySelector(".weather-icon");
        weatherIcon.src = iconPath;
        weatherIcon.onerror = function() {
            console.error(`Error loading image: ${iconPath}`);
            this.src = "images/default.png"; // Fallback to default icon if the specified icon is not found
        };
    } catch (error) {
        alert("City not found. Please try again.");
        console.error(error);
    }
}

// Trigger the function on button click
document.querySelector("button").addEventListener("click", checkWeather);
