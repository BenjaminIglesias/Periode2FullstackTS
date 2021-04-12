import { Router } from "express"
const router = Router();
import { IFriend } from '../interfaces/IFriend';
const Joi = require('joi');

import facade from "../facades/DummyDB-Facade"
import authMiddleware from "../middelware/basic-auth"
router.use("/", authMiddleware)

//get methods 
router.get("/all", async (req: any, res) => {
  const friends = await facade.getAllFriends();
  const friendsDTO = friends.map(friend=>{
    const        {firstName, lastName} = friend
    return {firstName:firstName,lastName} //Two ways, the silly way, and the easy way
  })
  res.json(friendsDTO);
})

router.get("/findby-username/:userid", async (req, res, next) => {
  const userId = req.params.userid;
  try {
    const friend = await facade.getFriend(userId);
    if (friend == null) {
      return next(new Error("user not found"))
    }
    const { firstName, lastName, email } = friend;
    const friendDTO = { firstName, lastName, email }
    res.json(friendDTO);
  } catch (err) {
    next(err)
  }
})

//post methods
router.post("/add", async (req, res, next) => {
  const friend = {
      id: `${facade.friends.length + 1}`,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
  }

  // Error handling for input
  const { error } = validateFriend(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const addFriend: IFriend | null = await facade.addFriend(friend);
  // res.json(addFriend)
  if (!addFriend)
      return res.status(404).send("Something went wrong - was not able to add a friend"); // 404 - object not found

  res.status(200).send("Friend was added");
});

router.post('/', async function (req, res, next) {
  try {
      const status = await facade.addFriend(req.body)
      res.json({ status })
  } catch (err) {
          next(err)
      } 
})

function validateFriend(friend: IFriend) {
  const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(6).required()
  };

  return Joi.validate(friend, schema);
}

export default router