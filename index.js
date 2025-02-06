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
        // 1. Verify the Firebase Token in the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
        }

        const token = authHeader.split("Bearer ")[1];
        
        // Verify the Firebase ID Token
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // Get the UID from the decoded token
        const uid = decodedToken.uid;

        // Now we can use the UID safely since the user is authenticated
        console.log("Authenticated UID:", uid);

        // 2. Extract request body
        const { mobile_number, network, plan } = req.body;

        if (!mobile_number || !network || !plan) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const apiRequestData = { network, plan, mobile_number, Ported_number: true };

        console.log("Sending request to external API:", apiRequestData);

        // 3. Make the external API call to buy data
        const response = await axios.post(url, apiRequestData, { headers });
        const result = response.data;

        if (!result || result.Status !== "successful") {
            return res.status(400).json({ message: "Transaction failed.", error: result.api_response || "Unknown error" });
        }

        // 4. Apply the markup and round the price
        let planAmountWithIncrease = Math.round(result.plan_amount * (1 + 7.78 / 100));

        // 5. Store transaction data in Firestore
        const transactionData = {
            id: result.id,
            ident: result.ident,
            mobile_number: result.mobile_number,
            plan: result.plan,
            plan_amount: planAmountWithIncrease.toString(),
            plan_network: result.plan_network,
            plan_name: result.plan_name,
            api_response: result.api_response,
            create_date: result.create_date,
            Ported_number: result.Ported_number,
            Status: result.Status,
        };

        await db.collection("users").doc(uid)
            .collection("airtime_transaction")
            .doc(result.id.toString())
            .set(transactionData);

        // 6. Deduct balance from the user
        const userRef = db.collection("users").doc(uid);
        const userDoc = await userRef.get();
        const currentBalance = userDoc.data()?.Balance;

        if (currentBalance >= planAmountWithIncrease) {
            const gain = (parseFloat(result.plan_amount) * 7.78) / 100;

            // Update Admin gain
            const adminRef = db.collection("Admin").doc("Admin404");
            const adminDoc = await adminRef.get();
            const newGain = (adminDoc.data()?.Gain || 0) + gain;

            await adminRef.update({ Gain: newGain });

            // Update user balance
            const newBalance = currentBalance - planAmountWithIncrease;
            await userRef.update({ Balance: newBalance });

            return res.status(200).json({
                api_response: result.api_response,
                balance_after: newBalance.toString(),
                balance_before: currentBalance.toString(),
                create_date: result.create_date,
                customer_ref: result.ident,
                id: result.id,
                ident: result.ident,
                mobile_number: result.mobile_number,
                network: result.network,
                plan: result.plan,
                plan_amount: planAmountWithIncrease.toString(),
                plan_name: result.plan_name,
                plan_network: result.plan_network,
                Ported_number: result.Ported_number,
                Status: result.Status,
            });
        } else {
            return res.status(400).json({ message: "Insufficient balance for this transaction" });
        }
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
        res.status(e.response?.status || 500).json({ error: e.response?.data || "An error occurred." });
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

        // Step 1: Validate User UID and check if their account is active
        const userRef = db.collection("users").doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({
                message: "User not found.",
            });
        }

        const userData = userDoc.data();

        if (!userData.isActive || userData.Balance <= 0) {
            return res.status(400).send({
                message: "User account is either inactive or has insufficient balance.",
            });
        }

        // Increase the amount by 7.78% markup and round it up
        const amountWithIncrease = Math.round(amount * (1 + 7.78 / 100));

        // Construct the data to send to the external API
        const apiRequestData = {
            network,
            amount: amountWithIncrease,
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
        await userRef.collection("airtime_transaction").doc(result.id.toString()).set(transactionData);

        // Step 2: Deduct the balance from the user after a successful transaction
        const currentBalance = userData.Balance;

        if (currentBalance >= amountWithIncrease) {
            // Deduct the balance
            const newBalance = currentBalance - amountWithIncrease;

            // Update Firestore with the new balance
            await userRef.update({ Balance: newBalance });

            return res.status(200).json({
                message: "Airtime purchase successful",
                transaction: transactionData,
                newBalance: newBalance,
                original_amount: amount,
                amount_with_increase: amountWithIncrease,
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
