const express = require("express");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 8081;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to insert random values into the parameters table
async function insertRandomValues() {
  const parameters = [
    "depth",
    "pressure",
    "temperature",
    "density",
    "viscosity",
    "humidity",
    "velocity",
    "concentration",
    "turbidity",
    "elevation",
    "tensileStrength",
  ];

  // Generate random values for each parameter
  const randomValues = parameters.reduce((acc, param) => {
    acc[param] = Math.random() * 100; // Generate random values between 0 and 100
    return acc;
  }, {});

  // Insert random values into the Parameter table
  try {
    await prisma.parameter.createMany({
      data: {
        ...randomValues,
        timestamp: new Date(),
      },
    });
    console.log("Random values inserted successfully");
  } catch (error) {
    console.error("Error inserting random values:", error);
  }
}

// Ping endpoint to keep the server active
app.get("/ping", (req, res) => {
  res.status(200).send("The anointed one");
  console.log("Ping request received and responded with pong");
});

// Schedule insertion of random values every 10 seconds
setInterval(insertRandomValues, 15000);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
