/* Global Variables */

// Create a new date instance dynamically with JS
let now = new Date();
let newDate =
  now.getMonth() + 1 + "." + now.getDate() + "." + now.getFullYear();
// Store the url and personal API Key for OpenWeatherMap API
const APIURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const APIKEY = "&appid=d8fe4d79a5e632844e40d8391811ac65&units=metric";
// Create an event listener to execute a function to existing html dom element when clicked
//Function called by event listener
const generateBtn = document.getElementById("generate");
//select html dom elements value to store it in a variable whenever the user enter an element value.
generateBtn.addEventListener("click", function () {
  const feelings = document.getElementById("feelings").value;
  const zipCode = document.getElementById("zip").value;
  /*Check if user didn't enter a zipcode and show an alert message
  to avoid taking an empty string as a value in projectData object*/
  if (!zipCode) {
    alert("Please, enter a zip code");
  } else {
    //if the user enter a value 3 functions are called
    //calling the function that gets the api data temp
    getAPIdata(APIURL, zipCode, APIKEY)
      .then((data) => {
        console.log("🚀 ~ file: app.js ~ line 27 ~ data", data);
        return postData("http://localhost:8000/addData", {
          temp: data.main.temp,
          date: newDate,
          feeling: feelings
        });
      })
      //Chaining another Promise that updates the UI dynamically
      .then(() => updateUI());
  }
});
//Function to GET OpenWeatherMap API Data
const getAPIdata = async (baseURL, zipCode, apiKey) => {
  ///wait until we have the api data
  const request = await fetch(baseURL + zipCode + apiKey);
  try {
    /* Getting the API data through the fetch API and turn it into json data*/
    const data = await request.json();
    console.log("🚀 ~ file: app.js ~ line 34 ~ getAPIdata ~ data", data);
    return data;
    //Handling the error
  } catch (error) {
    console.log(error);
  }
};
//Function to POST data to the server
/* Posting data through the /addData route to ProjectData object in the server*/
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  try {
    const data = await response.json();
    console.log("🚀 ~ file: app.js ~ line 50 ~ postData ~ data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:8000/all");
  try {
    /*Updating the html elements value with each object property from projectData
    coming from our fetching request to /all route*/
    const newData = await request.json();
    console.log("🚀 ~ file: app.js ~ line 61 ~ updateUI ~ newData", newData);
    document.getElementById("date").innerHTML = newData.temp;
    document.getElementById("temp").innerHTML = newData.date;
    document.getElementById("content").innerHTML = newData.feeling;
  } catch (error) {
    console.log(error);
  }
};
