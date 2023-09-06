const fetch = require("node-fetch");
exports.home = (req, res) => {
  res.render("home");
};

exports.getWeather = async (req, res) => {
  try {
    let { cities } = req.body;
    cities = JSON.stringify(cities);
    cities = JSON.parse(cities);
    console.log(cities);
    cities = Array.from(cities);
    console.log(cities);
    let baseUrl = "http://api.weatherapi.com/v1/current.json";

    let response = [];
    const weather = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=5db21a198da047cc8f6134827230609&q=banswara&aqi=no"
    );
    console.log(weather.body);
    cities.forEach(async (element) => {
      try {
        element = "mumbai";
        let res = await fetch(
          `${baseUrl}?key=${process.env.WEATHERAPI}&q=mumbai&aqi=no`
        );
        // console.log(res);
        // let toAdd = {};
        // toAdd["name"] = res.location.name;
        // toAdd.region = res.location.region;
        // toAdd.temperature = res.current.temp_c;
        // toAdd.condition = res.condition.text;
        // toAdd.windSpeed = res.wind_kph;
        // toAdd.windDirection = res.wind_dir;
        // toAdd.humidity = res.humidity;
        // response.push(toAdd);
      } catch (error) {
        console.log(error);
        // res.status(501).json({
        //   success: false,
        //   error: error.message,
        //   message: "Something went wrong while fetching weather",
        // });
      }
    });
    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Something went wrong before making API call",
    });
  }
};
