const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
require('dotenv').config();
const admin = require("firebase-admin")
const e = require("express");



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
const response1 =
{
    "user": {
        "id": 25045,
        "email": "ikfhfh",
        "username": "eeeee",
        "FullName": "vector",
        "pin": "4444",
        "img": "https://png.pngtree.com/png-vector/20190704/ourmid/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg",
        "Address": "e3ijei3",
        "Phone": "07774",
        "user_type": "Smart Earner",
        "email_verify": true,
        "password": "pbkdf2_sha256$216000$XK/EIuM64smsucXqJ/48AhMfOqpICF0=",
        "Account_Balance": 2000.757999999998,
        "wallet_balance": "000",
        "bonus_balance": "0",
        "referer_username": null,
        "bank_accounts": {
            "accounts": [
                {
                    "bankCode": "120001",
                    "bankName": "9Payment Service Bank",
                    "accountNumber": "5283375685",
                    "accountName": "DataStation Telecommunication Enterprise",
                    "account_type": "STATIC",
                    "expire_date": "",
                    "trackingReference": "6TK6NYHLM7289C93BAMNP5OD"
                }
            ]
        },
        "reservedaccountNumber": null,
        "reservedbankName": null
    },
    "notification": {
        "message": ""
    },
    "percentage": {
        "MTN": {
            "percent": 87,
            "phone": ""
        },
        "GLO": {
            "percent": 82,
            "phone": "070xxxxxxxx"
        },
        "9MOBILE": {
            "percent": 70,
            "phone": "081xxxxxxxx"
        },
        "AIRTEL": {
            "percent": 70,
            "phone": "080xxxxxxxx"
        }
    },
    "topuppercentage": {
        "MTN": {
            "VTU": 96.8,
            "Share and Sell": 96.8
        },
        "GLO": {
            "VTU": 95.0,
            "Share and Sell": 100.0
        },
        "9MOBILE": {
            "VTU": 97.0,
            "Share and Sell": 100.0
        },
        "AIRTEL": {
            "VTU": 97.5,
            "Share and Sell": 100.0
        }
    },
    "Admin_number": [
        {
            "network": "MTN",
            "phone_number": ""
        },
        {
            "network": "AIRTEL",
            "phone_number": "080xxxxxxxx"
        },
        {
            "network": "9MOBILE",
            "phone_number": "081xxxxxxxx"
        },
        {
            "network": "GLO",
            "phone_number": "070xxxxxxxx"
        }
    ],
    "Exam": {
        "WAEC": {
            "amount": 3500.0
        },
        "NECO": {
            "amount": 1300.0
        }
    },
    "banks": [],
    "banners": [],
    "Dataplans": {
        "MTN_PLAN": {
            "CORPORATE": [
                {
                    "id": 292,
                    "dataplan_id": "292",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30",
                    "plan": "50.0MB",
                    "plan_amount": "18.0"
                },
                {
                    "id": 260,
                    "dataplan_id": "260",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "150.0MB",
                    "plan_amount": "50.0"
                },
                {
                    "id": 49,
                    "dataplan_id": "49",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "250.0MB",
                    "plan_amount": "72.0"
                },
                {
                    "id": 212,
                    "dataplan_id": "212",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "500.0MB",
                    "plan_amount": "141.0"
                },
                {
                    "id": 208,
                    "dataplan_id": "208",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "1.0GB",
                    "plan_amount": "282.0"
                },
                {
                    "id": 209,
                    "dataplan_id": "209",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "2.0GB",
                    "plan_amount": "564.0"
                },
                {
                    "id": 210,
                    "dataplan_id": "210",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30days",
                    "plan": "3.0GB",
                    "plan_amount": "846.0"
                },
                {
                    "id": 211,
                    "dataplan_id": "211",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "5.0GB",
                    "plan_amount": "1410.0"
                },
                {
                    "id": 43,
                    "dataplan_id": "43",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "10.0GB",
                    "plan_amount": "3520.0"
                },
                {
                    "id": 223,
                    "dataplan_id": "223",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "15.0GB",
                    "plan_amount": "5280.0"
                },
                {
                    "id": 222,
                    "dataplan_id": "222",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "20.0GB",
                    "plan_amount": "5640.0"
                },
                {
                    "id": 237,
                    "dataplan_id": "237",
                    "network": 1,
                    "plan_type": "CORPORATE GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "40.0GB",
                    "plan_amount": "10880.0"
                }
            ],
            "SME2": [
                {
                    "id": 259,
                    "dataplan_id": "259",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "500.0MB",
                    "plan_amount": "139.0"
                },
                {
                    "id": 231,
                    "dataplan_id": "231",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "1.0GB",
                    "plan_amount": "278.0"
                },
                {
                    "id": 266,
                    "dataplan_id": "266",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "1.5GB",
                    "plan_amount": "408.0"
                },
                {
                    "id": 233,
                    "dataplan_id": "233",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "2.0GB",
                    "plan_amount": "556.0"
                },
                {
                    "id": 234,
                    "dataplan_id": "234",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "3.0GB",
                    "plan_amount": "834.0"
                },
                {
                    "id": 269,
                    "dataplan_id": "269",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "4.0GB",
                    "plan_amount": "1088.0"
                },
                {
                    "id": 235,
                    "dataplan_id": "235",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "5.0GB",
                    "plan_amount": "1390.0"
                },
                {
                    "id": 270,
                    "dataplan_id": "270",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "6.0GB",
                    "plan_amount": "1668.0"
                },
                {
                    "id": 271,
                    "dataplan_id": "271",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "7.0GB",
                    "plan_amount": "1946.0"
                },
                {
                    "id": 236,
                    "dataplan_id": "236",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "10.0GB",
                    "plan_amount": "2780.0"
                },
                {
                    "id": 272,
                    "dataplan_id": "272",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "35.0GB",
                    "plan_amount": "9430.0"
                },
                {
                    "id": 273,
                    "dataplan_id": "273",
                    "network": 1,
                    "plan_type": "SME2",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "40.0GB",
                    "plan_amount": "11120.0"
                }
            ],
            "SME": [
                {
                    "id": 214,
                    "dataplan_id": "214",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "500.0MB",
                    "plan_amount": "350"
                },
                {
                    "id": 7,
                    "dataplan_id": "7",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "1.0GB",
                    "plan_amount": "650.0"
                },
                {
                    "id": 8,
                    "dataplan_id": "8",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "2.0GB",
                    "plan_amount": "1260.0"
                },
                {
                    "id": 44,
                    "dataplan_id": "44",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "3.0GB",
                    "plan_amount": "1880.0"
                },
                {
                    "id": 291,
                    "dataplan_id": "291",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "5.0GB",
                    "plan_amount": "1285.0"
                },
                {
                    "id": 213,
                    "dataplan_id": "213",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "10.0GB",
                    "plan_amount": "6250.0"
                }
            ],
            "GIFTING": [
                {
                    "id": 215,
                    "dataplan_id": "215",
                    "network": 1,
                    "plan_type": "GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "1 day",
                    "plan": "1.0GB",
                    "plan_amount": "350.0"
                },
                {
                    "id": 305,
                    "dataplan_id": "305",
                    "network": 1,
                    "plan_type": "GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "1 day",
                    "plan": "1.5GB",
                    "plan_amount": "400.0"
                },
                {
                    "id": 216,
                    "dataplan_id": "216",
                    "network": 1,
                    "plan_type": "GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "2 days",
                    "plan": "3.2GB",
                    "plan_amount": "1000.0"
                },
                {
                    "id": 217,
                    "dataplan_id": "217",
                    "network": 1,
                    "plan_type": "GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "7 days",
                    "plan": "5.0GB",
                    "plan_amount": "1500.0"
                },
                {
                    "id": 309,
                    "dataplan_id": "309",
                    "network": 1,
                    "plan_type": "GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "7 days",
                    "plan": "7.0GB",
                    "plan_amount": "3000.0"
                },
                {
                    "id": 306,
                    "dataplan_id": "306",
                    "network": 1,
                    "plan_type": "GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "30 days",
                    "plan": "75.0GB",
                    "plan_amount": "20000.0"
                },
                {
                    "id": 307,
                    "dataplan_id": "307",
                    "network": 1,
                    "plan_type": "GIFTING",
                    "plan_network": "MTN",
                    "month_validate": "60 days",
                    "plan": "200.0GB",
                    "plan_amount": "49600.0"
                }
            ],
            "ALL": [
                {
                    "id": 1,
                    "dataplan_id": "1",
                    "network": 1,
                    "plan_type": "SME",
                     "plan_type1": "SME",
                    "plan_network": "MTN",
                    "month_validate": "3 Days",
                    "plan": "750MB",
                    "plan_amount": "470.00"
                },
                {
                    "id": 2,
                    "dataplan_id": "2",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_type1": "SME",
                    "plan_network": "MTN",
                    "month_validate": "7 Days",
                    "plan": "1.2GB",
                    "plan_amount": "770.00"
                },
                {
                    "id": 3,
                    "dataplan_id": "3",
                    "network": 1,
                    "plan_type": "SME",
                      "plan_type1": "SME",
                    "plan_network": "MTN",
                    "month_validate": "7 Days",
                    "plan": "1.5GB",
                    "plan_amount": "1020.00"
                },
                {
                    "id": 4,
                    "dataplan_id": "4",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                      "plan_type1": "SME",
                    "month_validate": "30 Days",
                    "plan": "2.7GB",
                    "plan_amount": "2000.00"
                },
                 {
                    "id": 5,
                    "dataplan_id": "5",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                       "plan_type1": "SME",
                    "month_validate": "7 Days",
                    "plan": "6GB",
                    "plan_amount": "2520.00"
                },

                {
                    "id": 6,
                    "dataplan_id": "6",
                    "network": 1,
                    "plan_type": "SME",
                    "plan_network": "MTN",
                    "plan_type1": "SME",
                    "month_validate": "30 Days",
                    "plan": "11GB",
                    "plan_amount": "4950.00"
                }  , {
    "id": 173,
    "dataplan_id": "173",
    "network": 1,
    "plan_type": "GiftingPlan",
    "plan_network": "MTN",
    "plan_type1": "GiftingPlan",
    "month_validate": "1 Days",
    "plan": "110MB",
    "plan_amount": "110.00"
},
{
    "id": 174,
    "dataplan_id": "174",
    "network": 1,
    "plan_type": "GiftingPlan",
    "plan_network": "MTN",
    "plan_type1": "GiftingPlan",
    "month_validate": "1 Days",
    "plan": "230MB",
    "plan_amount": "220.00"
},
{
    "id": 175,
    "dataplan_id": "175",
    "network": 1,
    "plan_type": "GiftingPlan",
    "plan_network": "MTN",
    "plan_type1": "GiftingPlan",
    "month_validate": "7 Days",
    "plan": "6GB",
    "plan_amount": "2450.00"
},
{
    "id": 176,
    "dataplan_id": "176",
    "network": 1,
    "plan_type": "GiftingPlan",
    "plan_network": "MTN",
    "plan_type1": "GiftingPlan",
    "month_validate": "2 Days",
    "plan": "2.5GB",
    "plan_amount": "900.00"
},
{
    "id": 177,
    "dataplan_id": "177",
    "network": 1,
    "plan_type": "GiftingPlan",
    "plan_network": "MTN",
    "plan_type1": "GiftingPlan",
    "month_validate": "30 Days",
    "plan": "3.5GB + 5Mins",
    "plan_amount": "2500.00"
},{
    "id": 302,
    "dataplan_id": "302",
    "network": 1,
    "plan_type": "XtraSpecial",
    "plan_network": "MTN",
    "plan_type1": "XtraSpecial",
    "month_validate": "30 Days",
    "plan": "6.75GB",
    "plan_amount": "3000.00"
},
{
    "id": 303,
    "dataplan_id": "303",
    "network": 1,
    "plan_type": "XtraSpecial",
    "plan_network": "MTN",
    "plan_type1": "XtraSpecial",
    "month_validate": "30 Days",
    "plan": "14.5GB",
    "plan_amount": "5000.00"
},{
    "id": 316,
    "dataplan_id": "316",
    "network": 1,
    "plan_type": "ThryveData",
    "plan_type1": "ThryveData",
    "plan_network": "MTN",
    "month_validate": "30 Days",
    "plan": "1.8GB + 35 Minutes Talktime",
    "plan_amount": "2550.00"
},
{
    "id": 317,
    "dataplan_id": "317",
    "network": 1,
    "plan_type": "ThryveData",
    "plan_type1": "ThryveData",
    "plan_network": "MTN",
    "month_validate": "30 Days",
    "plan": "10GB + ₦3000 Talktime",
    "plan_amount": "3050.00"
},
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
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "500MB",
                    "plan_amount": "225.00"
                },
                {
                    "id": 23,
                    "dataplan_id": "23",
                    "network": 3,
                    "plan_type": "Corporate",
                    "plan_network": "GLO",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "1GB",
                    "plan_amount": "450.00"
                },
                {
                    "id": 24,
                    "dataplan_id": "24",
                    "network": 3,
                    "plan_type": "Corporate",
                    "plan_network": "GLO",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "2GB",
                    "plan_amount": "900.00"
                },
                {
                    "id": 25,
                    "dataplan_id": "25",
                    "network": 3,
                    "plan_type": "Corporate",
                    "plan_network": "GLO",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "3GB",
                    "plan_amount": "1350.00"
                },
                {
                    "id": 26,
                    "dataplan_id": "26",
                    "network": 3,
                    "plan_type": "Corporate",
                    "plan_network": "GLO",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "5GB",
                    "plan_amount": "2250.00"
                },
                {
                    "id": 27,
                    "dataplan_id": "27",
                    "network": 3,
                    "plan_type": "Corporate",
                    "plan_network": "GLO",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "10GB",
                    "plan_amount": "4500.00"
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
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "500MB",
                    "plan_amount": "520.00"
                },
                {
                    "id": 29,
                    "dataplan_id": "29",
                    "network": 2,
                    "plan_type": "Corporate",
                    "plan_network": "AIRTEL",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "1GB",
                    "plan_amount": "822.00"
                },
                {
                    "id": 30,
                    "dataplan_id": "30",
                    "network": 2,
                    "plan_type": "Corporate",
                    "plan_network": "AIRTEL",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "2GB",
                    "plan_amount": "1547.00"
                },
                {
                    "id": 31,
                    "dataplan_id": "31",
                    "network": 2,
                    "plan_type": "Corporate",
                    "plan_network": "AIRTEL",
                      "plan_type1": "Cooperate",
                    "month_validate": "7 Days",
                    "plan": "100MB",
                    "plan_amount": "120.00"
                },
                {
                    "id": 32,
                    "dataplan_id": "32",
                    "network": 2,
                    "plan_type": "Corporate",
                    "plan_network": "AIRTEL",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "6GB",
                    "plan_amount": "3034.00"
                },
                {
                    "id": 33,
                    "dataplan_id": "33",
                    "network": 2,
                    "plan_type": "Corporate",
                    "plan_network": "AIRTEL",
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "10GB",
                    "plan_amount": "4112.00"
                },{
    "id": 111,
    "dataplan_id": "111",
    "network": 2,
    "plan_type": "SME",
    "plan_network": "AIRTEL",
    "plan_type1": "SME",
    "month_validate": "2 Days",
    "plan": "150MB",
    "plan_amount": "80.00"
},
{
    "id": 112,
    "dataplan_id": "112",
    "network": 2,
    "plan_type": "SME",
    "plan_network": "AIRTEL",
    "plan_type1": "SME",
    "month_validate": "2 Days",
    "plan": "300MB",
    "plan_amount": "140.00"
},
{
    "id": 113,
    "dataplan_id": "113",
    "network": 2,
    "plan_type": "SME",
    "plan_network": "AIRTEL",
    "plan_type1": "SME",
    "month_validate": "1 Days",
    "plan": "1GB",
    "plan_amount": "400.00"
},
{
    "id": 114,
    "dataplan_id": "114",
    "network": 2,
    "plan_type": "SME",
    "plan_network": "AIRTEL",
    "plan_type1": "SME",
    "month_validate": "5 Days",
    "plan": "2GB",
    "plan_amount": "720.00"
},
{
    "id": 116,
    "dataplan_id": "116",
    "network": 2,
    "plan_type": "SME",
    "plan_network": "AIRTEL",
    "plan_type1": "SME",
    "month_validate": "7 Days",
    "plan": "3GB",
    "plan_amount": "1100.00"
},
{
    "id": 117,
    "dataplan_id": "117",
    "network": 2,
    "plan_type": "SME",
    "plan_network": "AIRTEL",
    "plan_type1": "SME",
    "month_validate": "7 Days",
    "plan": "7GB",
    "plan_amount": "2200.00"
},
{
    "id": 118,
    "dataplan_id": "118",
    "network": 2,
    "plan_type": "SME",
    "plan_network": "AIRTEL",
    "plan_type1": "SME",
    "month_validate": "30 Days",
    "plan": "10GB",
    "plan_amount": "3400.00"
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
                      "plan_type1": "Cooperate",
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
                      "plan_type1": "Cooperate",
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
                      "plan_type1": "Cooperate",
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
                      "plan_type1": "Cooperate",
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
                      "plan_type1": "Cooperate",
                    "month_validate": "30 Days",
                    "plan": "10GB",
                    "plan_amount": "1400.00"
                }
            ]
        }
    }, 
    "Cableplan": {
        "GOTVPLAN": [
            {
                "id": 34,
                "cableplan_id": "34",
                "cable": "GOTV",
                "package": "GOtv Smallie - Monthly",
                "plan_amount": "1575"
            },
            {
                "id": 16,
                "cableplan_id": "16",
                "cable": "GOTV",
                "package": "GOtv Jinja",
                "plan_amount": "3300"
            },
            {
                "id": 35,
                "cableplan_id": "35",
                "cable": "GOTV",
                "package": "GOtv Smallie - Quarterly",
                "plan_amount": "4175"
            },
            {
                "id": 17,
                "cableplan_id": "17",
                "cable": "GOTV",
                "package": "GOtv Jolli",
                "plan_amount": "4850"
            },
            {
                "id": 2,
                "cableplan_id": "2",
                "cable": "GOTV",
                "package": "GOtv Max",
                "plan_amount": "7200"
            },
            {
                "id": 47,
                "cableplan_id": "47",
                "cable": "GOTV",
                "package": "GOtv Supa - monthly",
                "plan_amount": "9600"
            },
            {
                "id": 36,
                "cableplan_id": "36",
                "cable": "GOTV",
                "package": "GOtv Smallie - Yearly",
                "plan_amount": "12300"
            },
            {
                "id": 48,
                "cableplan_id": "48",
                "cable": "GOTV",
                "package": "Supa plus - 15700 Naira - 1 Month",
                "plan_amount": "15700"
            }
        ],
        "DSTVPLAN": [
            {
                "id": 21,
                "cableplan_id": "21",
                "cable": "DSTV",
                "package": "DStv Great Wall Standalone",
                "plan_amount": "2500"
            },
            {
                "id": 20,
                "cableplan_id": "20",
                "cable": "DSTV",
                "package": "DStv Padi",
                "plan_amount": "3600"
            },
            {
                "id": 33,
                "cableplan_id": "33",
                "cable": "DSTV",
                "package": "ExtraView Access",
                "plan_amount": "5000"
            },
            {
                "id": 6,
                "cableplan_id": "6",
                "cable": "DSTV",
                "package": "DStv Yanga",
                "plan_amount": "5100"
            },
            {
                "id": 28,
                "cableplan_id": "28",
                "cable": "DSTV",
                "package": "DStv Padi + ExtraView",
                "plan_amount": "8600"
            },
            {
                "id": 19,
                "cableplan_id": "19",
                "cable": "DSTV",
                "package": "DStv Confam",
                "plan_amount": "9300"
            },
            {
                "id": 27,
                "cableplan_id": "27",
                "cable": "DSTV",
                "package": "DStv Yanga + ExtraView",
                "plan_amount": "10100"
            },
            {
                "id": 26,
                "cableplan_id": "26",
                "cable": "DSTV",
                "package": "DStv Confam + ExtraView",
                "plan_amount": "14300"
            },
            {
                "id": 7,
                "cableplan_id": "7",
                "cable": "DSTV",
                "package": "DStv Compact",
                "plan_amount": "15700"
            },
            {
                "id": 29,
                "cableplan_id": "29",
                "cable": "DSTV",
                "package": "DStv Compact + Extra View",
                "plan_amount": "20700"
            },
            {
                "id": 8,
                "cableplan_id": "8",
                "cable": "DSTV",
                "package": "DStv Compact Plus",
                "plan_amount": "25000"
            },
            {
                "id": 31,
                "cableplan_id": "31",
                "cable": "DSTV",
                "package": "DStv Compact Plus - Extra View",
                "plan_amount": "30000"
            },
            {
                "id": 9,
                "cableplan_id": "9",
                "cable": "DSTV",
                "package": "DStv Premium",
                "plan_amount": "37000"
            },
            {
                "id": 25,
                "cableplan_id": "25",
                "cable": "DSTV",
                "package": "DStv Premium Asia",
                "plan_amount": "42000"
            },
            {
                "id": 30,
                "cableplan_id": "30",
                "cable": "DSTV",
                "package": "DStv Premium + Extra View",
                "plan_amount": "42000"
            },
            {
                "id": 24,
                "cableplan_id": "24",
                "cable": "DSTV",
                "package": "DStv Premium French",
                "plan_amount": "57500"
            }
        ],
        "STARTIMEPLAN": [
            {
                "id": 37,
                "cableplan_id": "37",
                "cable": "STARTIME",
                "package": "Nova - 500 Naira - 1 Week",
                "plan_amount": "500"
            },
            {
                "id": 38,
                "cableplan_id": "38",
                "cable": "STARTIME",
                "package": "Basic - 1100 Naira - 1 Week",
                "plan_amount": "1100"
            },
            {
                "id": 39,
                "cableplan_id": "39",
                "cable": "STARTIME",
                "package": "Smart - 1500 Naira - 1 Week",
                "plan_amount": "1500"
            },
            {
                "id": 14,
                "cableplan_id": "14",
                "cable": "STARTIME",
                "package": "Nova - 1700 Naira - 1 Month",
                "plan_amount": "1700"
            },
            {
                "id": 40,
                "cableplan_id": "40",
                "cable": "STARTIME",
                "package": "Classic - 1700 Naira - 1 Week",
                "plan_amount": "1700"
            },
            {
                "id": 41,
                "cableplan_id": "41",
                "cable": "STARTIME",
                "package": "Super - 2500 Naira - 1 Week",
                "plan_amount": "2800"
            },
            {
                "id": 49,
                "cableplan_id": "49",
                "cable": "STARTIME",
                "package": "Basic - 3300 Naira - 1 Month",
                "plan_amount": "3300"
            },
            {
                "id": 13,
                "cableplan_id": "13",
                "cable": "STARTIME",
                "package": "Smart - 3800 Naira - 1 Month",
                "plan_amount": "3800"
            },
            {
                "id": 11,
                "cableplan_id": "11",
                "cable": "STARTIME",
                "package": "Classic -5000 Naira - 1 Month",
                "plan_amount": "5000"
            },
            {
                "id": 15,
                "cableplan_id": "15",
                "cable": "STARTIME",
                "package": "Super - 8200 Naira - 1 Month",
                "plan_amount": "8200"
            }
        ],
        "cablename": [
            {
                "id": 1,
                "name": "GOTV"
            },
            {
                "id": 2,
                "name": "DSTV"
            },
            {
                "id": 3,
                "name": "STARTIME"
            }
        ]
    },
    "support_phone_number": "2349166679039",
    "recharge": {
        "mtn": 0,
        "glo": 0,
        "airtel": 0,
        "9mobile": 0,
        "mtn_pin": [
            {
                "id": 1,
                "network_name": "MTN",
                "amount": 100.0,
                "amount_to_pay": 98.0
            },
            {
                "id": 2,
                "network_name": "MTN",
                "amount": 200.0,
                "amount_to_pay": 198.0
            },
            {
                "id": 3,
                "network_name": "MTN",
                "amount": 500.0,
                "amount_to_pay": 498.0
            }
        ],
        "glo_pin": [
            {
                "id": 4,
                "network_name": "GLO",
                "amount": 100.0,
                "amount_to_pay": 97.0
            },
            {
                "id": 5,
                "network_name": "GLO",
                "amount": 200.0,
                "amount_to_pay": 197.0
            },
            {
                "id": 6,
                "network_name": "GLO",
                "amount": 500.0,
                "amount_to_pay": 497.0
            }
        ],
        "airtel_pin": [
            {
                "id": 10,
                "network_name": "AIRTEL",
                "amount": 100.0,
                "amount_to_pay": 98.0
            },
            {
                "id": 11,
                "network_name": "AIRTEL",
                "amount": 200.0,
                "amount_to_pay": 198.0
            },
            {
                "id": 12,
                "network_name": "AIRTEL",
                "amount": 500.0,
                "amount_to_pay": 497.0
            }
        ],
        "9mobile_pin": [
            {
                "id": 7,
                "network_name": "9MOBILE",
                "amount": 100.0,
                "amount_to_pay": 97.0
            },
            {
                "id": 8,
                "network_name": "9MOBILE",
                "amount": 200.0,
                "amount_to_pay": 197.0
            },
            {
                "id": 9,
                "network_name": "9MOBILE",
                "amount": 500.0,
                "amount_to_pay": 497.0
            }
        ]

    }
};

// **Apply Authentication Middleware to Protected Routes**
app.get("/api/GetuserInfo", authenticate, async (req, res) => {


    res.status(200).send(response1)

});


app.post("/api/buyData", authenticate, async (req, res) => {
    const url = "https://vtunaija.com.ng/api/data/";
    const headers = {
        Authorization: `Token ${process.env.APIKEY}`,
        "Content-Type": "application/json",
    };

    try {
        let { uid, mobile_number, network, plan } = req.body;
       
  if(network == 3){
      network= 2
  }else if (network == 2){
      network= 4
  }else if(network == 4){
      network=3
  }
        if (!uid || !mobile_number || !network || !plan) {
            return res.status(400).json({ message: "Missing required fields." })
        }
        function generateRandomId() {
            return Math.floor(100000 + Math.random() * 900000); // 6-digit number
        }

        const randomId = generateRandomId();
        console.log(randomId); // Example: 583241



        const apiRequestData = { network: network, plan: plan, mobile_number: mobile_number, Ported_number: true };
        console.log("Sending request to external API:", apiRequestData);

        const response = await axios.post(url, apiRequestData, { headers });
        const result = response.data;

        if (!result || result.Status !== "successful") {
            return res.status(400).json({ message: "Transaction failed.", error: result.api_response || "Unknown error" });
        }


        const plans = {
            1: response1.Dataplans.MTN_PLAN.ALL,
            2: response1.Dataplans.GLO_PLAN.ALL,
            3: response1.Dataplans["9MOBILE_PLAN"].ALL,
            4: response1.Dataplans.AIRTEL_PLAN.ALL
        };

        const selectedPlan = plans[network]?.find(e => e.id === plan);
        const modifiedAMount = selectedPlan ? selectedPlan.plan_amount : null;
        const modifiedplan = selectedPlan ? selectedPlan.id : null;
        const planNetwork = selectedPlan ? selectedPlan.plan_network : null;
        const planName = selectedPlan ? selectedPlan.plan : null;
        const now = new Date();
        const adjustedTime = new Date(now.getTime() + (1 * 60 * 60 * 1000)); // Add 1 hour for UTC+1
        const create_date = adjustedTime.toISOString().slice(0, -1) + "000";
        
        console.log("🔥 Corrected Time:", create_date);
        

        const transactionData = {
            id: generateRandomId(),
            ident: result.ident,
            mobile_number: mobile_number,
            plan: modifiedplan,
            plan_amount: modifiedAMount.toString(),
            plan_network: planNetwork,
            plan_name: planName.toString(),
            api_response: `Dear customer you have succesfully shared  ${planName.toString()} to ${mobile_number}`,
            create_date: create_date,
            Ported_number: true,
            Status: "successful",
        };

        await db.collection("users").doc(uid).collection("airtime_transaction").doc(result.id.toString()).set(transactionData);

        const userRef = db.collection("users").doc(uid);
        const userDoc = await userRef.get();
        const currentBalance = userDoc.data()?.Balance;

        if (currentBalance >= modifiedAMount) {
            const gain = (parseFloat(result.plan_amount) * 7.78) / 100;

            const adminRef = db.collection("Admin").doc("Admin404");
            const adminDoc = await adminRef.get();
            const newGain = (adminDoc.data()?.Gain || 0) + gain;

            await adminRef.update({ Gain: newGain });

            const newBalance = parseFloat((currentBalance - modifiedAMount).toFixed(1));
            await userRef.update({ Balance: newBalance });



            return res.status(200).json({
                api_response: transactionData.api_response,
                balance_after: newBalance.toString(),
                balance_before: currentBalance.toString(),
                create_date: transactionData.create_date,
                customer_ref: transactionData.ident,
                id: transactionData.id,
                ident: transactionData.ident,
                mobile_number: transactionData.mobile_number,
                network: 1, // Ensure this is an integer, not a string
                plan: transactionData.plan,
                plan_amount: transactionData.plan_amount,
                plan_name: transactionData.plan_name,
                plan_network: transactionData.plan_network,
                Ported_number: transactionData.Ported_number, // Must match @SerialName
                Status: "successful", // Must match @SerialName
            });

        } else {
            return res.status(400).json({ message: "Insufficient balance for this transaction" });
        }
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
        res.status(e.response?.status || 500).json({ error: e.response?.data || "An error occurred." });
    }
});

































app.post("/api/buyAirtime", authenticate, async (req, res) => {
    const url = "https://vtunaija.com.ng/api/topup/";
    const headers = {
        "Authorization": `Token ${process.env.APIKEY}`,
        "Content-Type": "application/json",
    };

    try {
        // Extract and validate request data
        const { uid, mobile_number, amount, network } = req.body;
        if (!uid || !mobile_number || !amount || !network) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Ensure amount is a number
        const amountValue = Number(amount);
        if (isNaN(amountValue) || amountValue <= 0) {
            return res.status(400).json({ message: "Invalid amount." });
        }

        // Send request to VTU API
        const apiRequestData = { network, amount: amountValue, mobile_number, Ported_number: true, airtime_type: "VTU" };
        console.log("Sending data to the external API:", apiRequestData);
        const response = await axios.post(url, apiRequestData, { headers });

        // Validate API response
        const result = response.data;
        if (!result || result.Status !== "successful") {
            return res.status(400).json({ message: "Transaction failed.", error: result.api_response || "Unknown error" });
        }

        // Generate transaction ID and timestamp
        function generateRandomId() {
            return Math.floor(100000 + Math.random() * 900000); // 6-digit number
        }
        const randomId = generateRandomId();
        const now = new Date();
        const adjustedTime = new Date(now.getTime() + (1 * 60 * 60 * 1000)); // Add 1 hour for UTC+1
        const create_date = adjustedTime.toISOString().slice(0, -1) + "000";
        
        console.log("🔥 Corrected Time:", create_date);
        
        // Construct transaction object
        const transactionData = {
            id: randomId, // 🔹 Use `randomId`
            ident: result.ident.toString(),
            mobile_number: mobile_number.toString(),
            amount: amountValue.toString(),
            plan_amount: amountValue.toString(),
            plan_network: network == 1 ? "MTN" : network == 2 ? "GLO" : network == 3 ? "9MOBILE" : "AIRTEL",
            Status: "successful",
            api_response: `You have successfully sent Airtime of ${amountValue} to ${mobile_number}`,
            create_date: create_date,
            Ported_number: true,
            airtime_type: result.airtime_type || "VTU",
            plan: result.plan || "",
            plan_name: result.plan_name || "",
        };

        // Firestore references
       
        const userRef = db.collection("users").doc(uid);
        const transactionRef = userRef.collection("airtime_transaction").doc(result.id.toString());

        // Fetch user balance
        const userDoc = await userRef.get();
        const currentBalance = userDoc.exists && userDoc.data().Balance !== undefined ? userDoc.data().Balance : 0;

        if (currentBalance < amountValue) {
            return res.status(400).json({ message: "Insufficient balance." });
        }

        // Deduct balance and store transaction using batch writes (atomic operation)
        const newBalance = parseFloat((currentBalance - amountValue).toFixed(2));
        const batch = db.batch();
        batch.set(transactionRef, transactionData);
        batch.update(userRef, { Balance: newBalance });
        await batch.commit(); // 🔹 Perform both operations atomically

        return res.status(200).json({ Status: "successful", message: "Airtime purchase successful." });

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.response?.data || "An error occurred while processing your request." });
    }
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
