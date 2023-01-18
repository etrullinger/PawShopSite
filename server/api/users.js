const router = require('express').Router()
const { models: { User }} = require('../db')


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

router.get('/:userId', async (req, res, next) => {
  try {
      const user = await User.findByPk(req.params.userId, {
        attributes: ['id', 'firstName', 'lastName', 'email']
      });
      res.send(user);
  } catch(error) {
    next(error)
  }
})

// PUT /api/users/userId 
router.put('/:userId', async (req, res, next) => {
  try {
      const user = await User.findByPk(req.params.userId, {
        attributes: ['id', 'firstName', 'lastName', 'email']
      });
      res.send(await user.update(req.body));
  } catch(error) {
    next(error)
  }
})

module.exports = router