const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");

//get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      res.render("gigs", {
        gigs,
      });
    })
    .catch((error) => console.log("error: ", error))
);

//display add gig form
router.get("/add", (req, res) => res.render("add"));

//add a gig
router.post("/add", (req, res) => {
  const data = {
    title: "Simple Wordpress Website",
    technologies: "wordpress,php,html,css",
    budget: "$1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contact_email: "user2@gmail.com",
  };
  //pulling all this out from the data object
  let { title, technologies, budget, description, contact_email } = data;

  //Insert into table
  Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_email,
  })
    .then((gig) => res.redirect("/gigs"))
    .catch((err) => console.log("error " + err));
});

module.exports = router;
