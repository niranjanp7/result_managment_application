const Express = require("express");
const BodyParser = require("body-parser");
const Http = require("http");
const Path = require("path");
const APP_CONFIG = require("./app-config");
const { sequelize } = require("./models")

const app = Express();

app.use(BodyParser.urlencoded());

// Static files
app.use(Express.static(Path.join(__dirname, "public")));

// View engine
app.set("views", "./src/views")
app.set("view engine", "ejs");

// Routing
const homeRoute = require("./src/routes/home");
const studentRoute = require("./src/routes/student");
const teacherRoute = require("./src/routes/teacher");

app.use("/", homeRoute);
app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);

const startServer = async (host, port) => {
    await sequelize.sync();
    const portAvailable = isPortAvailable(host, port);

    if (portAvailable) {

        const server = app.listen(port, host);
        
        server.on("listening", () => {
            console.log(`Node server is listening on : http://${host}:${port}/`)
        });

        server.on("error", (err) => {
            server.close();
            console.log(err);
        });
    } else {
        console.log(`PORT ${port} is already in use. Please specify a different one.`)
    }
};

/**
 * Check if a specified host and port is available for starting server on it.
 * 
 * @param {string} host
 * @param {string} port
 * @returns {boolean} Return `true` if specified port is available, `false` otherwise
 */
const isPortAvailable = (host, port) => {
    return new Promise((resolve, reject) => {
        const httpServer = Http.createServer();

        httpServer.once("error", (err) => {
            if (err.code === "EADDRINUSE") {
                resolve(false);
            } else {
                reject(err);
            }
        });

        httpServer.once("listening", () => {
            httpServer.close();
            resolve(true);
        })

        httpServer.listen(port, host);
    });
};

// Start Server
startServer(APP_CONFIG.HOST, APP_CONFIG.PORT);