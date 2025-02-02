const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
require('dotenv').config();
const admin = require("firebase-admin");



const serviceAccount = {
    type: process.env.SERVICE_ACCOUNT_TYPE,
    project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
    private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
    auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URI,
    token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
    universe_domain: process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
};


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



const db = admin.firestore();  // Firestore instance


app.get("/api/GetuserInfo", async (req, res) => {
    const url = "https://datastationapi.com/api/user/";
    const headers = {
        "Authorization": `Token ${process.env.APIKEY}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.get(url, { headers });

        // Safely add an 11.67% markup to all plan amounts in Dataplans
        if (response.data && response.data.Dataplans) {
            const dataplans = response.data.Dataplans;

            // Iterate through each network's plans
            for (const [networkKey, networkPlans] of Object.entries(dataplans)) {
                for (const [planType, plans] of Object.entries(networkPlans)) {
                    if (Array.isArray(plans)) {
                        plans.forEach(plan => {
                            if (plan.plan_amount) {
                                // Apply the 11.67% markup
                              let updatedAmount = parseFloat(plan.plan_amount) * (1 + 7.78 / 100);


                                // Round up to the nearest whole number
                                plan.plan_amount = Math.ceil(updatedAmount).toFixed(2);
                            }
                        });
                    }
                }
            }
        }

        // Send the modified response back to the frontend
        res.status(200).send(response.data);
    } catch (e) {
        console.error("Error fetching data from external API:", e.message);
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
        const { uid, mobile_number, network, plan } = req.body;

        // Ensure all required fields are present
        if (!uid || !mobile_number || !network || !plan) {
            return res.status(400).send({
                message: "Missing required fields. Ensure uid, mobile_number, network, and plan are provided.",
            });
        }

        const apiRequestData = {
            network,
            plan,
            mobile_number,
            Ported_number: true,
        };

        console.log("Sending data to the external API:", apiRequestData);

        // Send POST request to the external API
        const response = await axios.post(url, apiRequestData, { headers });

        const result = response.data;

        if (!result || result.Status !== "successful") {
            return res.status(400).json({
                message: "Transaction failed.",
                error: result.api_response || "Unknown error",
            });
        }

        const transactionData = {
            id: result.id,
            ident: result.ident,
            mobile_number: result.mobile_number,
            amount: result.plan_amount,
            plan_amount: result.plan_amount,
            plan_network: result.plan_network,
            Status: result.Status,
            api_response: result.api_response,
            create_date: result.create_date,
            Ported_number: result.Ported_number,
            airtime_type: result.airtime_type || "",
            plan: result.plan || "",
            plan_name: result.plan_name || "",
        };

        // Store transaction in Firestore under the user's UID
        await db.collection("users").doc(uid)  // Store under uid
            .collection("airtime_transaction")
            .doc(result.id.toString())
            .set(transactionData);

        // Step 2: Deduct the balance from the user after a successful transaction
        const userRef = db.collection("users").doc(uid);

        // Get the current balance of the user
        const userDoc = await userRef.get();
        const currentBalance = userDoc.data()?.Balance;

        if (currentBalance >= result.plan_amount) {
            // Convert plan_amount to a number if it's a string
            const planAmount = parseFloat(result.plan_amount);

            // Calculate 11.67% of the plan amount
          const gain = (planAmount * 7.78) / 100;


            // Fetch the current gain value from the Admin document
            const adminRef = db.collection("Admin").doc("Admin404");
            const adminDoc = await adminRef.get();
            const currentGain = adminDoc.data()?.Gain || 0;

            // Update the gain with the new value
            const newGain = currentGain + gain;

            // Update the Admin Gain field in Firestore
            await adminRef.update({ Gain: newGain });

            // Deduct the balance
            const newBalance = currentBalance - planAmount;

            // Update Firestore with the new balance
            await userRef.update({ Balance: newBalance });

            return res.status(200).json({
                message: "Airtime purchase successful",
                transaction: transactionData,
                newBalance: newBalance,
                newGain: newGain,  // Include the updated gain
            });
        } else {
            return res.status(400).json({
                message: "Insufficient balance for this transaction",
            });
        }
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
        "Authorization": `Token ${process.env.APIKEY}`,
        "Content-Type": "application/json",
    };

    try {
        // Extract data from the request body
        const { uid, mobile_number, amount, network } = req.body;

        // Check for missing required fields
        if (!uid || !mobile_number || !amount || !network) {
            return res.status(400).send({
                message: "Missing required fields. Ensure uid, mobile_number, amount, and network are provided.",
            });
        }

        // Construct the data to send to the external API
        const apiRequestData = {
            network,
            amount,
            mobile_number,
            Ported_number: true,
            airtime_type: "VTU",
        };

        console.log("Sending data to the external API:", apiRequestData);

        // Send POST request to the external API
        const response = await axios.post(url, apiRequestData, { headers });
        const result = response.data;

        if (!result || result.Status !== "successful") {
            return res.status(400).json({
                message: "Transaction failed.",
                error: result.api_response || "Unknown error",
            });
        }

        // Format the transaction data to match the frontend's structure
        const transactionData = {
            id: result.id,
            ident: result.ident,
            mobile_number: result.mobile_number,
            amount: result.amount,
            plan_amount: result.plan_amount,
            plan_network: result.plan_network,
            Status: result.Status,
            api_response: result.api_response,
            create_date: result.create_date,
            Ported_number: result.Ported_number,
            airtime_type: result.airtime_type || "VTU",
            plan: result.plan || "",
            plan_name: result.plan_name || "",
        };

        // Store transaction in Firestore under the user's UID
        await db.collection("users").doc(uid)  // 🔹 Store under uid
            .collection("airtime_transaction")
            .doc(result.id.toString())
            .set(transactionData);

        // Step 2: Deduct the balance from the user after a successful transaction
        const userRef = db.collection("users").doc(uid);

        // Get the current balance of the user
        const userDoc = await userRef.get();
        const currentBalance = userDoc.data().Balance;

        if (currentBalance >= amount) {
            // Deduct the balance
            const newBalance = currentBalance - amount;

            // Update Firestore with the new balance
            await userRef.update({ Balance: newBalance });

            return res.status(200).json({
                message: "Airtime purchase successful",
                transaction: transactionData,
                newBalance: newBalance,
            });
        } else {
            return res.status(400).json({
                message: "Insufficient balance.",
            });
        }

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).send({
            error: error.response?.data || "An error occurred while processing your request.",
        });
    }
});



app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
