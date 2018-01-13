'use strict';
var express = require('express');
var router = express.Router();
const java = require('java');
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');

// const multer  = require('multer');
// const crypto = require('crypto');
// const fse = require('fs-extra');

java.classpath.push(path.resolve(__dirname, "../jar/commons-beanutils-1.8.3.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/commons-collections4-4.1.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/dom4j-1.6.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/json-2.1.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/poi-3.9.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/poi-examples-3.9.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/poi-excelant-3.9.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/poi-ooxml-3.9.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/poi-ooxml-schemas-3.9.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/poi-scratchpad-3.9.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/stax-api.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/xmlbeans-2.6.0.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/fastjson-1.1.2.jar"));
java.classpath.push(path.resolve(__dirname, "../jar/parseExcel.jar"));


// var filedatasStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let dir = `uploads/xlsx/`;
//     fse.ensureDirSync(dir);
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     crypto.pseudoRandomBytes(16, function (err, raw) {
//       if (err) return cb(err)
//       let filename = raw.toString('hex') + path.extname(file.originalname);
//       cb(null, filename);
//     });
//   }
// });
//
// var dataFile = multer({ storage: filedatasStorage });

router.get('/uploadFile', /*dataFile.single('file'),*/ function(req, res) {
  try{
    var file = req.query.path;
    var ReadExcel = java.import('com.onyx.xlsx.ReadExcel');
    var excel = new ReadExcel();
    var data = excel.readExcelSync(file);
    return res.status(200).json(data);
  }catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/index', function (req, res) {
  return res.status(200).json('ok');
})

module.exports = router;
