var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

'use strict';

router.get('/', function(req, res, next) {

  var ldap = require('ldapjs');
  const assert = require('assert');

  var client = ldap.createClient({
    url: 'ldap://localhost:389',
    connectTimeout: 5000, //milliseconds
    idleTimeout: 60000,   //milliseconds
  });

  console.log("-------------------------------------------------");
  console.log("data122  : "+req.query.uid);
  console.log("-------------------------------------------------");
  console.log("data122  : "+req.query.ou);
  client.bind('cn=admin,dc=btvg2,dc=com', 'g2Arch1!', function(err, res) {
    assert.ifError(err);
    console.log(res);

    client.del('uid='+req.query.uid+',ou='+req.query.ou+',dc=btvg2,dc=com', function(err, res) {
      assert.ifError(err);
      console.log(res);
    });
  });

  res.send(req.body.phone);

});


module.exports = router;
