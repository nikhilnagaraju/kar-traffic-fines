const express = require('express');
const router = express.Router();
const axios = require('axios');
const trafficFinesEndpoint = "https://www.karnatakaone.gov.in/PoliceCollectionOfFine/FineDetails";
const regPattern = RegExp(/^([a-z,A-Z]{2})([0-6][0-9]|70)[a-z,A-Z]{0,2}[0-9]{4}$/);

router.get('/', (req, res) => {
  res.send({
    "status": "ok",
    "message": "Why say hello world!, when you can say HELLO UNIVERSE!"
  });
})

router.get('/fines', (req, res) => {
  var registration = req.query.registration;

  if (!registration || !regPattern.test(registration)) {
    return res.status(400).send({
      "status": "error",
      "message": "A valid 'registration' param in 'KAXX(AZ)XXXX' format is required."
    });
  }

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

router.get('**', (req, res) => {
  res.status(400).send({
    "status": "error",
    "message": "use '/fines' endpoint with 'registration' query param in 'KAXX(AZ)XXXX' format to check fines."
  });
});

module.exports = router;