var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
    res.render("index");
});

router.get("js/touch.js", function(req,res){
    res.render("../js/touch.js");
});

module.exports = router;