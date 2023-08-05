const express = require('express');
const app = express();
const signup = require('./routes/signup');
const mongoose = require('mongoose');
const cors = require('cors');
const login = require('./routes/login');
require('dotenv').config()



app.use(cors());
app.use(express.json())
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Database');
    app.listen(3001,()=>{
        console.log('Working');
    })
})


app.get('/',(req,res)=>{
    res.send('Server running')
})

app.use('/user',signup);
app.use('/user',login)