import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
// Endpoint to get data from the JSON file
app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log(data); // Logs the data to the console
    res.send(data); // Sends the data back to the client
  });
});

app.get("/contributer", (req, res) => {
  fs.readFile("contributer.json", "utf-8", (err, contributer) => {
    if(err){
      console.error("Error reading in contributer file", err);
      return res.status(500).send("Internal Server Error");
    }

    console.log(contributer);
    res.send(contributer);
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
