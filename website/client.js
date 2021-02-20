// Setting up variables for fetching "OpenWeatherMap" API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=5c4fa7430dda3347c0f677fe7004ce6e";
const celsiusDegree = "&units=metric";

// User response textarea

// Date
const current = new Date();
const [day, month, year] = [
  current.getDate(),
  current.getMonth() + 1,
  current.getFullYear(),
];

// Submit button
document.getElementById("generate").addEventListener("click", performAction);
function performAction(e) {
  e.preventDefault();
  const userResponse = document.getElementById("user-response").value;
  const cityName = document.getElementById("user-city-input").value;

  weatherAPI(baseURL, cityName, API_KEY, celsiusDegree).then(function (data) {
    // console.log(data);
    postData("addData", {
      temperature: data.main.temp,
      date: `${day} ${month} ${year}`,
      userResponse: userResponse,
    }).then(updateUI());
  });
}

// get request to OpenWeatherApp
const weatherAPI = async (baseURL, cityName, API_KEY, celsiusDegree) => {
  const res = await fetch(baseURL + cityName + API_KEY + celsiusDegree);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log(error);
  }
};

// update the UI
const updateUI = async () => {
  const response = await fetch("/all");
  try {
    const data = await response.json();
    console.log("updateUI", data);
    document.getElementById(
      "temperature"
    ).innerHTML = `Temperature ${data.temperature} degrees`;
    document.getElementById("date").innerHTML = `Todays date: ${data.date}`;
    document.getElementById(
      "user-input"
    ).innerHTML = `Today i feel: ${data.userResponse}`;
  } catch (error) {
    console.log("UpdateUI ERROR", error);
  }
};

// GET route to API endpoint
const getData = async (url) => {
  const request = await fetch(url);
  // console.log(request);
  try {
    const newData = await request.json();
    // console.log("inside getData", newData);
    return newData;
  } catch (error) {
    console.log("ERROR /all", error);
  }
};

// POST updated  data to server API endpoint
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log("postData ERROR", error);
  }
};
