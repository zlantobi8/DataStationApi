const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
require('dotenv').config();

app.get("/api/GetuserInfo", async (req, res) => {
    const url = "https://datastationapi.com/api/user/";
    const headers = {
        "Authorization": `Token ${process.env.APIKEY}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.get(url, { headers });
        res.status(200).send(response.data);
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ error: "Failed to fetch data from the external API." });
    }
});








app.post("/api/buyData", async (req, res) => {
    const url = "https://datastationapi.com/api/data/";
    const headers = {
        "Authorization": `Token ${process.env.APIKEY}`,
        "Content-Type": "application/json",
    };

    try {
        const data = req.body; // Request body sent by the client

        // Send POST request to the external API
        const response = await axios.post(url, data, { headers });

        // Send the updated response back to the client
        res.status(200).send(response.data);
    } catch (e) {
        // Log the error for debugging purposes
        console.error("Error:", e.response ? e.response.data : e.message);

        // Send a safe error response to the client
        res.status(e.response?.status || 500).send({
            error: e.response?.data || "An error occurred while processing your request.",
        });
    }
});




app.post("/api/buyAirtime", async (req, res) => {
    const url = "https://datastationapi.com/api/topup/";
    const headers = {
        "Authorization": `Token ${process.env.APIKEY}`, // Use environment variable for the token
        "Content-Type": "application/json",
    };

    try {
        const data = req.body; // Request body sent by the client
        const response = await axios.post(url, data, { headers }); // Send POST request to external API

        res.status(200).send(response.data); // Return the external API's response to the client
    } catch (error) {
        console.error("Error:", error.response?.data || error.message); // Log the error for debugging
        res.status(error.response?.status || 500).send({
            error: error.response?.data || "An error occurred while processing your request.",
        });
    }
});







app.get('/api/fetchData', async (req, res) => {
    const url = 'https://datastationapi.com/api/data/';
    const headers = {
        'Authorization': `Token ${process.env.APIKEY}`, // Include your API Token
        'Content-Type': 'application/json'
    };

    try {
        // Send the GET request to the external API
        const response = await axios.get(url, { headers });

        // Send the response data back to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json({ error: 'Failed to fetch data from external API', message: error.message });
    }
});









app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
