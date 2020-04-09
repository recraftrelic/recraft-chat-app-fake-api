import jsonServer from 'json-server';
import dataBase from '../db.json';
const is = require("is_js");
const userRouter = jsonServer.create();

userRouter.post("/", async (req, res) => {
  const { email, password, fullName, username } = req.body;
  console.log(email, password, fullName, username, 'email, password, fullName, username')
  if (!email) {
    return res.status(400).json({ errors: "Email is required" })
  } else if (!is.email(email)) {
    return res.status(400).json({ errors: "Email is invalid" })
  }
  if (!password) {
    return res.status(400).json({ errors: "Password is required" })
  }
  if (!fullName) {
    return res.status(400).json({ errors: "Full name is required" })
  }
  if (!username) {
    return res.status(400).json({ errors: "User name is required" })
  }

  try {
    let userExist = dataBase.users.find(user => user.email === email)
    if (userExist) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(200).json({ message: "User created successfully" })
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong. Unable to create user" })
  }

});

export default userRouter