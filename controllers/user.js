const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const token = setUser(user);
  return res.json({ token });
  // res.cookie("uid", token); used for sending info in cookies
  // return res.redirect("/");
}
module.exports = {
  handleUserSignup,
  handleUserLogin,
};
