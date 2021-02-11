import * as expres from 'express';
import * as bodypar from 'body-parser';

const app = expres();
const port = 3000;

app.use(bodypar.urlencoded({ extended: true }));
app.use(bodypar.json());


app.get('/', (req, res) => {
  res.send('Hello World!!')
});



const employeeslist = [
 { "id": 1, "name": "Ramesh D", "email":"ram123@gmail.com"},
 { "id": 2, "name": "Raju S", "email":"raju23@gmail.com"},
 { "id": 3, "name": "Kiran M", "email":"kiran123@gmail.com"}
]


app.get('/employees', (req, res) => { 
  res.send(employeeslist);
});

app.post('/employee',(req, res) => {
  employeeslist.push({ "id": employeeslist.length + 1, "name": req.body.name, "email": req.body.email});
  res.send(employeeslist);
});

app.delete('/employee/:id',(req, res) => {
 const id = req.params.id;
 for (var i = 0; i < employeeslist.length; i++) {
    var obj = employeeslist[i];
    if (obj["id"] == id) {
     employeeslist.splice(i, 1);
 }
}
  res.send(employeeslist);
});

app.put('/employee',(req, res) => {
  employeeslist[req.body.id] = req.body;
  res.send(employeeslist);
});


app.listen(port, () => {
  console.log(`Employee Maintanence app listening at http://localhost:${port}`)
});

