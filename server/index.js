const keys = require("./keys");

// Express Applicaton Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool, Client } = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

pgClient.on("connect", (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.log("PG ERROR", err));
});

// Express route definitions
app.get("/", (req, res) => {
    res.send("Hi");
});

// Get the values
app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * FROM values");

    res.send(values);
});

// Insert a value
app.post("/values", async (req, res) => {
    if (!req.body.value) res.send({ working: false });

    pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);

    res.send({ working: true });
});

app.listen(5000, (err) => {
    console.log("Listening...");
});
