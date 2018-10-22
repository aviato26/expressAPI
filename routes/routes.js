
let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  console.log('req recieved')
})


module.exports = router
