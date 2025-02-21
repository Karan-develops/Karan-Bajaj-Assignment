import express from "express";
import cors from "cors";
import { config } from "dotenv";
import bfhlRoutes from "./routes/bfhl.js"

config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsConfiguration = {
  origin: ["https://karan-bajaj-test.vercel.app"],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfiguration));

app.use(cors());

app.use("/bfhl", bfhlRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "200 Ok, Hello World from Karan Aggarwal :)",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
