// function callback() {
//     console.log('nishant is here');
// }

// const add = function(a,b, callback) {
//      var result = a+b;
//      console.log("result " + result);
//     callback();
// }

// // add(2,3,callback);

// add(5,7, () => console.log("complte proess"));

// node

// const { log } = require('console');
// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);

// fs.appendFile('greeting.txt', "Hello " + user.username + ("\n"), () => console.log(printed));

// import file

// const notes = require('./notes')
// var _ = require('lodash')

// var age = notes.age;
// console.log("age ",age);

// var twonum = notes.addnum(age+ 1, 10);
// console.log("result " ,twonum);

// var arr = ['nish', 'nish',1,1,2,3,2,1,'zoro' ,1];
// var filter = _.uniq(arr);
// console.log(filter);
// console.log(_.isString('nish'));
// console.log(_);

                      // express video

// const jsonconvert = {"name": "nishant", "age": 30, "city": "Delhi"}
// const jsonObject = JSON.stringify(jsonconvert);
// console.log(jsonObject);

const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello welcome");
});


// import the router files
const personRoute = require('./routes/personRoutes');
const menuItemsRoute = require('./routes/menuitemsRoutes');

app.use('/person', personRoute)
app.use('/menuitems', menuItemsRoute);

app.listen(3000);

// git branch -M main
// git push -u origin main