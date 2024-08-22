import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import conn from "./db.js";

import authRoute from "./src/routes/authRoute.js";
import osintRoute from "./src/routes/osintRoute.js";
import tokenControll from "./src/middleware/authMiddleware.js";
// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());

//HTTP başlıklarını düzenleyerek güvenliği artırmak için kullanılır. Örneğin, XSS saldırılarına karşı koruma sağlar.
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// morgan: HTTP istekleri hakkında günlük kayıtları tutmak için kullanılır.
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  CORS, tarayıcı güvenliği nedeniyle kaynaklara farklı bir kökten (origin) erişim sağlamanın kontrolünü düzenleyen bir güvenlik önlemidir.
app.use(cors());

// MONGOOSE SETUP
conn();
//Routes
app.use("/api/auth", authRoute);
app.use("/api/osint", tokenControll, osintRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Port:${PORT}`));
