const express = require('express');
const router = express.Router();

const jsonfileservice = require('./utils/jsonfileservice')();
const folderpath = '/data/';

router.get('/bower', getBower);

function getBower(req, res) {
    
    var json = {
        data: jsonfileservice.getJsonFromFile('/../../bower.json')
    };
    res.send(json);
    
}

module.exports = router;