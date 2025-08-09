const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const userController = require("./controllers/userController");
const transferController = require("./controllers/transferController");

const app = express();
app.use(express.json());

// Swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// User routes
app.use("/users", userController);

// Transfer routes
app.use("/transfers", transferController);

module.exports = app;
