const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=535d0bf2bad5047cdbb42ad24ec2cd08`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else if (!body.main) {
      callback("Forecast could not be measured for the specified coordinates");
    } else {
      console.log(body);
      callback(
        undefined,
        `It is currently ${
          body.main.temp - 273.15
        } degrees out, but it feels like ${
          body.main.feels_like - 273.15
        }. Humidity is ${body.main.humidity}%`
      );
    }
  });
};

module.exports = forecast;
