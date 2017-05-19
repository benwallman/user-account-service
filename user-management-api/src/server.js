import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import register from './routes/register';
import userExists from './routes/userExists';
import validation from './middleware/validation';

let config = {};
config.port = "8082";
config.mongoUri = "mongodb://mongo:27017";
const port = config.port;
const mongoUri = config.mongoUri;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validation);

mongoose.connect(mongoUri).then(()=>{console.log(`Successfully connected to: ${mongoUri}`)});
mongoose.Promise = global.Promise;


//Routes
app.post('/register', register);

app.get('/hello', userExists);

app.use('*', ({res}) => res.sendStatus(404));

app.listen(port, ()=> console.log(`User Management Api started on port: ${port}`));

