const express = require("express");
const path=require("path");
const app= express();
// const fs=require("fs");

const bodyparser=require("body-parser")


const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser:true});

const port=80;


var contactschema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    age: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactschema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))


app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('index', params);
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact', params);
})

app.get('/services',(req,res)=>{
    const params={ }
    res.status(200).render('services', params);
})

app.get('/about',(req,res)=>{
    const params={ }
    res.status(200).render('about', params);
})

app.get('/register',(req,res)=>{
    const params={ }
    res.status(200).render('register', params);
})


app.post('/contact',(req,res)=>{
    var mydata= new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("The item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})




app.listen(port,()=>{
    console.log(`Server started successfuly at port ${port}`);
})