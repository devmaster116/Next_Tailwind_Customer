// prepare-env.js
const fs = require("fs");
const path = require("path");

// Get the current branch name
const branch = require("child_process")
  .execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim();

// Map branches to environment files
const envFile = process.env.ENVIRONMENT === "development" ? ".env.dev" : ".env.staging";
// Load the environment variables from the selected file
require("dotenv").config({ path: path.resolve(process.cwd(), envFile) });

console.log(`Using environment file: ${envFile}`);
// console.log(process.env)

// Define the paths for the source and destination files
const sourceFilePath = path.resolve(__dirname, envFile);
const destinationFilePath = path.resolve(__dirname, ".env.temp");

// Copy the file and give it a new name
fs.copyFile(sourceFilePath, destinationFilePath, err => {
  if (err) {
    console.error("Error copying the file:", err);
    return;
  }
  console.log(`File successfully copied to: ${destinationFilePath}`);
});
