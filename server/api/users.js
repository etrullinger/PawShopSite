const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'admin']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

//GET /api/users - for admin viewing only
// router.get('/', async (req, res, next) => {
//   try {
//     const loggedInUser = await User.findByToken(req.headers.authorization);
//     if(loggedInUser.admin){
//       const users = await User.findAll({
//         attributes: ['id', 'email', 'admin']
//       });
//       res.send(users);
//     }
//   } catch(error) {
//     next(error)
//   }
// })