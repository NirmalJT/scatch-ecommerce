require("dotenv").config();
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const Path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const MongoStore = require("connect-mongo"); // Import connect-mongo

const ownersRoutes = require("./routes/ownersRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const indexRouter = require("./routes/index.js");

const db = require("./config/mongoose-connection.js");
const PORT = process.env.PORT || 3000;

app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // MongoDB URI from your .env
      ttl: 14 * 24 * 60 * 60, // Session expiration time in seconds (14 days)
    }),
  })
);

app.use(flash());

app.use(express.static(Path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/owners", ownersRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/", indexRouter);
app.set("views", Path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
