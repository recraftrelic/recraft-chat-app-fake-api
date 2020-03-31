import jsonServer from 'json-server';
const is = require("is_js");
import loginValidations from "../validation/login";
//const { validate } = require("micro-validator").default
import dataBase from '../db.json';

const loginRouter = jsonServer.create();

loginRouter.post("/", async (req, res) => {
  //const validationErrors = validate(loginValidations, req.body)
  const { email, password } = req.body;
  // if (!is.empty(validationErrors)) {
  //   return res.status(400).json({ errors: validationErrors })
  // }

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