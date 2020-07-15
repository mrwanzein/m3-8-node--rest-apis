'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { getAllClients, getClient, createClient, deleteClient } = require('./handlers/clientHandlers');
const { getWordsArr, getSingleWord, guessLetter } = require('./handlers/hangmanHandlers');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/clients', getAllClients)
  .get('/client/:id', getClient)
  .post('/client/add', createClient)
  .delete('/client/:id', deleteClient)
  .get('/hangman/word/:id', getWordsArr)
  .get('/hangman/word', getSingleWord)
  .get('/hangman/guess/:id/:letter', guessLetter)

  .listen(8000, () => console.log(`Listening on port 8000`));
