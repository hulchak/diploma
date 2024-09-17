import express from "express";

import keycloak from "../auth/keycloak.js";
import {Cat} from "../model/cat.js";

const router = express.Router();
router.use(keycloak.protect())

router.post("/", async (req, res) => {
  let cat = new Cat(req.body)
  let result = await cat.save();

  res.send(result).status(204);
});

router.get("/", async (req, res) => {
  let results = await Cat.find()

  res.send(results).status(200);
});

export default router;
