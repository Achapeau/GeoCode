// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// create express app

const express = require("express");

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// import and mount the API routes
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const reservationRoutes = require("./routes/reservation.routes");
const stationRoutes = require("./routes/station.routes");
const userRoutes = require("./routes/user.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const favouritesRoutes = require("./routes/favourite.routes");

// serve the `backend/public` folder for public resources

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/reservations", reservationRoutes);
app.use("/station", stationRoutes);
app.use("/user", userRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/favourites", favouritesRoutes);

app.use(express.static(path.join(__dirname, "../public")));
app.use(
  express.static(path.join(__dirname, "../public/assets/images/vehicles"))
);

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
