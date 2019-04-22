const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const handlers = require('./handlers');
const {decrypt} = require('./services/crypto');
const {PUBLIC_KEY} = require('./config');
app.use(cors());
app.use(bodyParser.json({ strict: false }));

const generateResponse = (data) => {
  return {
    status: 'OK',
    data: data
  };
}
const generateError = (error) => {
  return {
    status: "ERR",
    data: error
  };
}

app.post('/doors', (req, res) => {
  const {user, pwEncrypted, pubKey} = req.body;
  let {pw} = req.body;
  if(pwEncrypted && pubKey) {
    pw = decrypt(pwEncrypted, pubKey);
  }
  if (typeof user !== 'string') {
		res.status(400).json(generateError('"user" must be a string' ));
	} else if (typeof pw !== 'string') {
		res.status(400).json(generateError('"pw" must be a string' ));
  }
  handlers.getDoors(user, pw).then(val => {
    res.status(200).json(generateResponse(val));
  }).catch(err => {
    if(err == 'Bad login') {
      res.status(401).json(generateError(err));
      return;
    }
    res.status(400).json(generateError(err));
  })
})
app.post('/requests', (req, res) => {
  const { user, doorCode, pwEncrypted, pubKey } = req.body;
  let {pw} = req.body;
  if(pwEncrypted && pubKey) {
    pw = decrypt(pwEncrypted, pubKey);
  }
	if (typeof user !== 'string') {
		res.status(400).json(generateError('"user" must be a string' ));
	} else if (typeof pw !== 'string') {
		res.status(400).json(generateError('"pw" must be a string' ));
	} else if (typeof doorCode != 'string') {
    res.status(400).json(generateError('"doorCode" must be a string' ));
  }
  handlers.createRequest(user, pw, doorCode, pwEncrypted, pubKey).then(val => {
    res.status(201).json(generateResponse(val));
  }).catch(err => {
    if(err == 'Bad login') {
      res.status(401).json(generateError(err));
      return;
    }
    res.status(400).json(generateError(err));
    return;
  });
});

app.get('/requests/:id/info', (req, res) => {
  const requestId = req.params.id;
  if(typeof requestId !== 'string') {
    res.status(400).json(generateError('"id" must be a string'));
  }
  handlers.validateRequest(requestId).then(data => {
    res.status(200).json(generateResponse(data));
  }).catch(err => {
    console.log(err);
    if(err == 'NOT_FOUND') {
      res.status(404).json(generateError(err));
      return;
    }
    res.status(400).json(generateError(err));
  })
});

app.get('/pubkey', (req, res) => {
  
  res.status(200).json(generateResponse(PUBLIC_KEY));
})

app.get('/requests/:id', (req, res) => {
  const requestId = req.params.id;
  if(typeof requestId !== 'string') {
    res.status(400).json(generateError('"id" must be a string'));
  }
  handlers.useRequest(requestId).then(data => {
    res.status(200).json(generateResponse(data));
  }).catch(err => {
    console.log(err);
    res.status(400).json(generateError(err));
  })
});
module.exports = app;