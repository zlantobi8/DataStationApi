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

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; // Attach user info to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
};

// **Apply Authentication Middleware to Protected Routes**
app.get("/api/GetuserInfo", authenticate, async (req, res) => {
    const response = {
        "Dataplans": {
            "MTN_PLAN": {
                "ALL": [
                    {
                        "id": 1,
                        "dataplan_id": "1",
                        "network": 1,
                        "plan_type": "SME",
                        "plan_network": "MTN",
                        "month_validate": "30 Days",
                        "plan": "500MB",
                        "plan_amount": "137.50"
                    },
                    {
                        "id": 2,
                        "dataplan_id": "2",
                        "network": 1,
                        "plan_type": "SME",
                        "plan_network": "MTN",
                        "month_validate": "30 Days",
                        "plan": "1GB",
                        "plan_amount": "275.00"
                    },
                    {
                        "id": 3,
                        "dataplan_id": "3",
                        "network": 1,
                        "plan_type": "SME",
                        "plan_network": "MTN",
                        "month_validate": "30 Days",
                        "plan": "2GB",
                        "plan_amount": "550.00"
                    },
                    {
                        "id": 4,
                        "dataplan_id": "4",
                        "network": 1,
                        "plan_type": "SME",
                        "plan_network": "MTN",
                        "month_validate": "30 Days",
                        "plan": "3GB",
                        "plan_amount": "825.00"
                    },
                    {
                        "id": 5,
                        "dataplan_id": "5",
                        "network": 1,
                        "plan_type": "SME",
                        "plan_network": "MTN",
                        "month_validate": "30 Days",
                        "plan": "5GB",
                        "plan_amount": "1375.00"
                    },
                    {
                        "id": 6,
                        "dataplan_id": "6",
                        "network": 1,
                        "plan_type": "SME",
                        "plan_network": "MTN",
                        "month_validate": "30 Days",
                        "plan": "10GB",
                        "plan_amount": "2600.00"
                    }
                ]
            },
            "AIRTEL_PLAN": {
                "ALL": [
                    {
                        "id": 28,
                        "dataplan_id": "28",
                        "network": 2,
                        "plan_type": "Corporate",
                        "plan_network": "AIRTEL",
                        "month_validate": "30 Days",
                        "plan": "500MB",
                        "plan_amount": "283.00"
                    },
                    {
                        "id": 29,
                        "dataplan_id": "29",
                        "network": 2,
                        "plan_type": "Corporate",
                        "plan_network": "AIRTEL",
                        "month_validate": "30 Days",
                        "plan": "1GB",
                        "plan_amount": "566.00"
                    },
                    {
                        "id": 30,
                        "dataplan_id": "30",
                        "network": 2,
                        "plan_type": "Corporate",
                        "plan_network": "AIRTEL",
                        "month_validate": "30 Days",
                        "plan": "2GB",
                        "plan_amount": "1132.00"
                    },
                    {
                        "id": 31,
                        "dataplan_id": "31",
                        "network": 2,
                        "plan_type": "Corporate",
                        "plan_network": "AIRTEL",
                        "month_validate": "7 Days",
                        "plan": "100MB",
                        "plan_amount": "142.00"
                    },
                    {
                        "id": 32,
                        "dataplan_id": "32",
                        "network": 2,
                        "plan_type": "Corporate",
                        "plan_network": "AIRTEL",
                        "month_validate": "30 Days",
                        "plan": "5GB",
                        "plan_amount": "2830.00"
                    },
                    {
                        "id": 33,
                        "dataplan_id": "33",
                        "network": 2,
                        "plan_type": "Corporate",
                        "plan_network": "AIRTEL",
                        "month_validate": "30 Days",
                        "plan": "10GB",
                        "plan_amount": "5560.00"
                    }
                ]
            },
            "GLO_PLAN": {
                "ALL": [
                    {
                        "id": 22,
                        "dataplan_id": "22",
                        "network": 3,
                        "plan_type": "Corporate",
                        "plan_network": "GLO",
                        "month_validate": "30 Days",
                        "plan": "500MB",
                        "plan_amount": "143.00"
                    },
                    {
                        "id": 23,
                        "dataplan_id": "23",
                        "network": 3,
                        "plan_type": "Corporate",
                        "plan_network": "GLO",
                        "month_validate": "30 Days",
                        "plan": "1GB",
                        "plan_amount": "286.00"
                    },
                    {
                        "id": 24,
                        "dataplan_id": "24",
                        "network": 3,
                        "plan_type": "Corporate",
                        "plan_network": "GLO",
                        "month_validate": "30 Days",
                        "plan": "2GB",
                        "plan_amount": "572.00"
                    },
                    {
                        "id": 25,
                        "dataplan_id": "25",
                        "network": 3,
                        "plan_type": "Corporate",
                        "plan_network": "GLO",
                        "month_validate": "30 Days",
                        "plan": "3GB",
                        "plan_amount": "858.00"
                    },
                    {
                        "id": 26,
                        "dataplan_id": "26",
                        "network": 3,
                        "plan_type": "Corporate",
                        "plan_network": "GLO",
                        "month_validate": "30 Days",
                        "plan": "5GB",
                        "plan_amount": "1430.00"
                    },
                    {
                        "id": 27,
                        "dataplan_id": "27",
                        "network": 3,
                        "plan_type": "Corporate",
                        "plan_network": "GLO",
                        "month_validate": "30 Days",
                        "plan": "10GB",
                        "plan_amount": "2760.00"
                    }
                ]
            },
            "9MOBILE_PLAN": {
                "ALL": [
                    {
                        "id": 34,
                        "dataplan_id": "34",
                        "network": 4,
                        "plan_type": "Corporate",
                        "plan_network": "9MOBILE",
                        "month_validate": "30 Days",
                        "plan": "500MB",
                        "plan_amount": "80.00"
                    },
                    {
                        "id": 35,
                        "dataplan_id": "35",
                        "network": 4,
                        "plan_type": "Corporate",
                        "plan_network": "9MOBILE",
                        "month_validate": "30 Days",
                        "plan": "1GB",
                        "plan_amount": "149.00"
                    },
                    {
                        "id": 36,
                        "dataplan_id": "36",
                        "network": 4,
                        "plan_type": "Corporate",
                        "plan_network": "9MOBILE",
                        "month_validate": "30 Days",
                        "plan": "2GB",
                        "plan_amount": "300.00"
                    },
                    {
                        "id": 37,
                        "dataplan_id": "37",
                        "network": 4,
                        "plan_type": "Corporate",
                        "plan_network": "9MOBILE",
                        "month_validate": "30 Days",
                        "plan": "3GB",
                        "plan_amount": "450.00"
                    },
                    {
                        "id": 39,
                        "dataplan_id": "39",
                        "network": 4,
                        "plan_type": "Corporate",
                        "plan_network": "9MOBILE",
                        "month_validate": "30 Days",
                        "plan": "10GB",
                        "plan_amount": "1400.00"
                    }
                ]
            }
        }
    };
    

    res.status(200).send(response)

});


app.post("/api/buyData", authenticate, async (req, res) => {
    const url = "https://datastationapi.com/api/data/";
    const headers = {
        Authorization: `Token ${process.env.APIKEY}`,
        "Content-Type": "application/json",
    };

    try {
        const { uid, mobile_number, network, plan } = req.body;

        if (!uid || !mobile_number || !network || !plan) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const apiRequestData = { network, plan, mobile_number, Ported_number: true };
        console.log("Sending request to external API:", apiRequestData);

        const response = await axios.post(url, apiRequestData, { headers });
        const result = response.data;

        if (!result || result.Status !== "successful") {
            return res.status(400).json({ message: "Transaction failed.", error: result.api_response || "Unknown error" });
        }

        let planAmountWithIncrease = Math.round(parseFloat(result.plan_amount) * (1 + 7.78 / 100));

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

        await db.collection("users").doc(uid).collection("airtime_transaction").doc(result.id.toString()).set(transactionData);

        const userRef = db.collection("users").doc(uid);
        const userDoc = await userRef.get();
        const currentBalance = userDoc.data()?.Balance;

        if (currentBalance >= planAmountWithIncrease) {
            const gain = (parseFloat(result.plan_amount) * 7.78) / 100;

            const adminRef = db.collection("Admin").doc("Admin404");
            const adminDoc = await adminRef.get();
            const newGain = (adminDoc.data()?.Gain || 0) + gain;

            await adminRef.update({ Gain: newGain });

            const newBalance = parseFloat((currentBalance - planAmountWithIncrease).toFixed(1));
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





app.post("/api/buyAirtime",authenticate, async (req, res) => {
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
       const newBalance = parseFloat((currentBalance - amount).toFixed(1));

// Update Firestore with the new balance
await userRef.update({ Balance: newBalance });


 return res.status(200).json({
    Status: result.Status
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
