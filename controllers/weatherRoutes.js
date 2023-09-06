const httpRequest = require("../utils/httpRequest");
exports.home = (req, res) => {
  res.render("home");
};

exports.getWeather = async (req, res) => {
  try {
    let { cities } = req.body;
    cities = JSON.stringify(cities);
    let cityArray = [];

    let oneCity = "";
    for (let i = 0; i < cities.length; i++) {
      if (cities[i] === '"') {
        continue;
      } else if (cities[i].toLowerCase() !== cities[i].toUpperCase()) {
        oneCity += cities[i];
      } else if (cities[i] === ",") {
        cityArray.push(oneCity);
        oneCity = "";
      }
    }
    let baseUrl = "https://api.weatherapi.com/v1/current.json";
    let response = [];
    const promiseArray = cityArray.map(async (element) => {
      try {
        let url = `${baseUrl}?key=${process.env.WEATHERAPI}&q=${element}&aqi=no`;
        let toAdd = {};
        const res = await httpRequest(url);

        toAdd.name = res.location.name;
        toAdd.region = res.location.region;
        toAdd.temperature = res.current.temp_c;
        toAdd.condition = res.current.condition.text;
        toAdd.image = res.current.condition.icon;
        let toaddString = JSON.stringify(toAdd);
        let finalObject = JSON.parse(toaddString);
        return finalObject;
      } catch (error) {
        console.log(error);
      }
    });
    const result = await Promise.all(promiseArray);
    console.log(result);
    res.status(200).render("weather", { result });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
