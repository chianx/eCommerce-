const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log("Error:", err.message);
    console.log("Shutting does this server due to uncaught error");
    process.exit(1);
})

//  Config 
dotenv.config({path: "backend/config/config.env"});

// connect mongo db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
})

process.on("unhandledRejection", err => {
    console.log("Error : " + err.message);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    })
})