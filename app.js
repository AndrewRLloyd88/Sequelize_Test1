const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Database
const db = require("./config/database");

//testDB
db.authenticate()
  .then(() => console.log("database connected..."))
  .catch((err) => console.log("Error " + err));

const app = express();

//Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("INDEX"));

//Gig Routes

app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
