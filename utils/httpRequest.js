const https = require("https");

function httpRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = "";
      console.log("statusCode:", response.statusCode);
      response.on("data", (chunk) => {
        data += chunk.toString();
      });
      response.on("end", () => {
        let jsondata = JSON.parse(data);
        resolve(jsondata);
      });
    });
  });
}
module.exports = httpRequest;
