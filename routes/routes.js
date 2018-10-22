
let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  console.log('received a req')
})


module.exports = router
