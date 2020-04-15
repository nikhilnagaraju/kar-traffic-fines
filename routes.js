const express = require('express');
const router = express.Router();
const axios = require('axios');
const trafficFinesEndpoint = "https://www.karnatakaone.gov.in/PoliceCollectionOfFine/FineDetails";

router.get('/', (req, res) => {
  res.send({
    "status": "ok",
    "message": "Why say hello world!, when you can say HELLO UNIVERSE!"
  });
})

router.get('/fines', (req, res) => {
  var registration = req.query.registration;
  var options = {
    params: {
      'SearchBy': 'REGNO',
      'ServiceCode': 'BPS',
      'SearchValue': registration,
    }
  }
  axios.post(trafficFinesEndpoint, null, options).then(extResponse => {
    res.send(extResponse.data);
  }).catch(err => {
    console.error(err);
    res.status(400).send(err);
  })
});

module.exports = router;