const path = require("path");
const forecast = require("./utils/weathercode");
const geocode = require("./utils/geocode");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3002;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ariangel D E",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Ariangel D E",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help title",
    helpText: "How can we help you?",
    name: "Ariangel D E",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, theData) => {
        if (error) {
          return res.send({ error });
        }
        //console.log(location);
        //console.log(theData);
        res.send({
          location,
          forecast: theData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Ariangel D E",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Ariangel D E",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
