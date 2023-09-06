const router = require("express").Router();
const { home, getWeather } = require("../controllers/weatherRoutes");
router.route("/").get(home);
router.route("/getWeather").post(getWeather);
module.exports = router;
