// Select DOM elements
let Search = document.querySelector(".Search");
let boxInput = document.querySelector(".box input");
let temp_c = document.querySelector(".temp_c span");
let name1 = document.querySelector(".name");
let localtime = document.querySelector(".localtime");
let text = document.querySelector(".text");
let cloud = document.querySelector(".cloud span");
let humidity = document.querySelector(".humidity span");
let wind_mph = document.querySelector(".wind_mph span");
let wind_dir = document.querySelector(".wind_dir span");
let uv = document.querySelector(".uv span");
let gust_mph = document.querySelector(".gust_mph span");
let pressure_mb = document.querySelector(".pressure_mb span");
let icon1 = document.querySelector(".icon img");
let watherImage = document.querySelector(".watherImage");
let box = document.querySelector(".box");

// Initial weather location and data
let weatherLocation = "India";
let data;

// Hide the weather box initially
box.style.visibility = "hidden";

// Function to fetch and display weather information
const getInfo = async () => {
    box.style.visibility = "hidden";
    watherImage.style.visibility = "visible";
    let url = `https://api.weatherapi.com/v1/current.json?key=130b44c27be74779913163747241006&q=${weatherLocation}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        data = await response.json();
        
        // Update DOM elements with weather data
        temp_c.innerText = data.current.temp_c;
        name1.innerText = data.location.name;
        localtime.innerText = data.location.localtime;
        text.innerText = data.current.condition.text;
        cloud.innerText = `${data.current.cloud}%`;
        humidity.innerText = `${data.current.humidity}%`;
        wind_mph.innerText = `${data.current.wind_mph} (m/h)`;
        wind_dir.innerText = data.current.wind_dir;
        uv.innerText = data.current.uv;
        gust_mph.innerText = `${data.current.gust_mph} (mph)`;
        pressure_mb.innerText = `${data.current.pressure_mb} (millibars)`;
        
        box.style.visibility = "visible";
        watherImage.style.visibility = "hidden";
    } catch (error) {
        console.error('Error fetching weather data:', error);
        box.style.visibility = "visible";
        watherImage.style.visibility = "hidden";
    }
};

// Event listener for search button click
Search.addEventListener("click", () => {
    weatherLocation = boxInput.value.trim(); // Trim any extra whitespace
    if (weatherLocation) { // Ensure the location is not empty
        boxInput.value = "";
        getInfo();
    } else {
        console.error('Please enter a location');
    }
});

// Event listener for 'Enter' key press in input box
boxInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        weatherLocation = boxInput.value.trim(); // Trim any extra whitespace
        if (weatherLocation) { // Ensure the location is not empty
            boxInput.value = "";
            getInfo();
        } else {
            console.error('Please enter a location');
        }
    }
});

// Initial fetch of weather information
getInfo();
