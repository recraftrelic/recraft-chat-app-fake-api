import jsonServer from 'json-server';

import dataBase from '../db.json';

const is = require("is_js");
const loginRouter = jsonServer.create();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ errors: "Email is required" })
  } else if (!is.email(email)) {
    return res.status(400).json({ errors: "Email is invalid" })
  }
  if (!password) {
    return res.status(400).json({ errors: "Password is required" })
  }
  try {
    let useExist = dataBase.users.find(user => user.email === email && user.password === password)
    if (useExist) {
      res.status(200).json("Login Successfully");
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid Credentials" });
  }
});

export default loginRouter