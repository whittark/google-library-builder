const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For my production build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://whittark:happycake1@ds027771.mlab.com:27771/heroku_bdj72ln7",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

// Expose the dynamic port Heroku uses to run the app
app.listen(PORT, () => {
  console.log(`The app is running on port ${ PORT }`);
});
