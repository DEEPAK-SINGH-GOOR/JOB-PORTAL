require("dotenv").config();
const mongoose = require("mongoose");


const dbConnector = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    if (!db) return console.log("Database Is Not Conneced.");
    return console.log("Database Is Conneced.");
  } catch (error) {
    console.log("error : ", error);
  }
};

module.exports = dbConnector;
