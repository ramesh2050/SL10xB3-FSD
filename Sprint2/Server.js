"use strict";
exports.__esModule = true;
var expres = require("express");
var bodypar = require("body-parser");
var app = expres();
var port = 3000;
app.use(bodypar.urlencoded({ extended: true }));
app.use(bodypar.json());
app.get('/', function (req, res) {
    res.send('Hello World!!');
});
var employeeslist = [
    { "id": 1, "name": "Ramesh D", "email": "ram123@gmail.com" },
    { "id": 2, "name": "Raju S", "email": "raju23@gmail.com" },
    { "id": 3, "name": "Kiran M", "email": "kiran123@gmail.com" }
];
app.get('/employees', function (req, res) {
    res.send(employeeslist);
});
app.post('/employee', function (req, res) {
    employeeslist.push({ "id": employeeslist.length + 1, "name": req.body.name, "email": req.body.email });
    res.send(employeeslist);
});
app["delete"]('/employee/:id', function (req, res) {
    var id = req.params.id;
    for (var i = 0; i < employeeslist.length; i++) {
        var obj = employeeslist[i];
        if (obj["id"] == id) {
            employeeslist.splice(i, 1);
        }
    }
    res.send(employeeslist);
});
app.put('/employee', function (req, res) {
    employeeslist[req.body.id] = req.body;
    res.send(employeeslist);
});
app.listen(port, function () {
    console.log("Employee Maintanence app listening at http://localhost:" + port);
});
