require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

import routes from "./routes/index";
app.use("/", routes);

app.get("/", (req: any, res: { json: (arg0: { message: string }) => void }) => {
  res.json({ message: "Welcome to the application." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
