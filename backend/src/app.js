require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const eventRoutes = require("./routes/event.routes");
const rideRoutes = require("./routes/ride.routes");
const rideRequestRoutes = require("./routes/rideRequest.routes");
const smartEventRoutes = require("./routes/smartEvent.routes");

const app = express();

const defaultOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173"
];

const envOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
    : [];

const allowedOrigins = [...defaultOrigins, ...envOrigins];

app.use(cors({
    origin: (origin, callback) => {
        // Pozwól na zapytania bez nagłówka Origin (np. aplikacje mobilne, Postman, testy)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some((allowed) => {
            if (allowed === "*") return true;
            return origin === allowed || origin.replace(/\/$/, "") === allowed;
        });

        if (isAllowed) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
}));

app.use(express.json());

// Endpoint sprawdzający stan serwera (używany m.in. przez Render / monitoring)
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api", rideRequestRoutes);
app.use("/api", smartEventRoutes);

module.exports = app;
