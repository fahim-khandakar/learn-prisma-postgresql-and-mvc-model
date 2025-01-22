import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Hi Everyone");
});

// * Routes file
app.use("/api/v1", routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
