const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner-model.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();

    if (owner.length > 0) {
      return res
        .status(401)
        .send("You don't have the authorization to make admin");
    }
    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}
router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproduct", { success });

  console.log(req.session);
});

module.exports = router;
