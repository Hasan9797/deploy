const router = require("express").Router();
const User = require("../models/addUser");

router.post("/", async (req, res) => {
  const { fullName, email, descr, title, price } = req.body;
  const user = new User(fullName, email, descr, title, price);
  await user.save();
  res.status(200).json({
    message: "Aded is sucsessfully",
    data: user,
  });
});

router.get("/", async (req, res) => {
  const user = await User.getAll();
  res.status(200).json({
    data: user,
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.getById(req.params.id);
  res.status(200).json({
    user,
  });
});

module.exports = router;
