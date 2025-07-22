const connecToMongo = require('./db');
const express = require('express')
const cors = require("cors");
const path = require('path');

connecToMongo();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Serve static files from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.json());

app.use('/signup',require('./routes/signup'));

app.use('/login',require('./routes/login'));
app.use('/getuser',require('./routes/getuser'));

app.use('/voter',require('./routes/voter'));
app.use('/userpass',require('./routes/userpass'));

app.use('/category',require('./routes/showcategory'));
app.use('/candidate',require('./routes/showcandidate'));

app.use('/votes',require('./routes/votes'));

app.listen(port,()=>{
    console.log('in listen');
})