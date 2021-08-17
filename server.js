const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/dbconfig");
const log = require("./routes/log");

const app = express();
const server = require("http").createServer(app);

/**
 * Array of routes
 */
const routes = [
    "Log"
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, PATCH");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

db.sequelize.sync({ alter: true });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Nine-25 Application." });
});

/**
 * Routers
 */
app.use("/Log", log);
routes.forEach((route) => {
    let routers = require("./routes/" + route.toLowerCase() + ".js");
    app.use("/" + route, routers);
});

app.use("*", function (req, res) {
    res.status(404).send("404");
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    console.log(err.message)
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}.`);
});